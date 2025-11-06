import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AuthServices } from "./auth.service.js";
import httpStatus from "http-status";

// ================= LOGIN =================
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully!",
    data: result,
  });
});

export const AuthControllers = {
    loginUser,
}