import { catchAsync } from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";
import httpStatus from "http-status"

const registerCustomer = catchAsync(async (req, res) => {
  const result = await UserServices.registerCustomerIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Customer registered successfully",
    data: result,
  });
});
const registerCallCenterAgent = catchAsync(async (req, res) => {
  const result = await UserServices.registerCallCenterAgent(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Call Center Agent registered successfully",
    data: result,
  });
});

const registerDispatcher = catchAsync(async (req, res) => {
  const result = await UserServices.registerDispatcher(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Dispatcher registered successfully",
    data: result,
  });
})

const registerFreelancerTechnician = catchAsync(async (req, res) => {
  const result = await UserServices.registerFreelancerTechnician(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Freelancer Technician registered successfully",
    data: result,
  });
})
const registerInternalTechnician = catchAsync(async (req, res) => {
  const result = await UserServices.registerInternalTechnician(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Internal Technician registered successfully",
    data: result,
  });
})

const registerAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.registerAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin registered successfully",
    data: result,
  });
})

export const UserControllers = {
  registerCustomer,
  registerCallCenterAgent,
  registerDispatcher,
  registerFreelancerTechnician,
  registerInternalTechnician,
  registerAdmin
}