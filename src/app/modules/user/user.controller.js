import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";
import httpStatus from "http-status"

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UserControllers = {
    registerUser
}