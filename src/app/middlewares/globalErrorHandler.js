import config from "../../config/index.js";
import ApiError from "../errors/ApiError.js";
import handleCastError from "../errors/handleCastError.js";
import handleValidationError from "../errors/handleValidationError.js";
import handleZodError from "../errors/handleZodError.js";
import { ZodError } from "zod";

export const globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something Went Wrong !';
  let errorSource = [
    {
      path: '',
      message: 'Something Went Wrong !',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErrors = handleZodError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedErrors = handleValidationError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err.name === 'CastError') {
    const simplifiedErrors = handleCastError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err.code === 11000) { // duplicate key error
    const simplifiedErrors = handleCastError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSource = simplifiedErrors.errorSource;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};