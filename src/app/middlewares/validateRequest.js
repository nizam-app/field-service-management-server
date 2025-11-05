import { catchAsync } from "../utils/catchAsync.js";

export const validateRequest = (schema) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync(req.body);
    next();
  });
};