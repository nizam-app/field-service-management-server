import ApiError from "../../errors/ApiError.js";
import { User } from "./user.model.js";
import httpStatus from "http-status";

// ==========================
const registerCustomerIntoDB = async (payload) => {
    // 1. Check if user exists
    const user = await User.findOne({ phone: payload.phone });
    if (user) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }

    // 2. create customer
    const result = await User.create(payload)
    return result;
};
// "customer", "call-center-agent", "dispatcher", "freelancer-technician", "internal-technician", "admin"
const registerCallCenterAgent = async (payload) => {
    // 1. Check if user exists
    const user = await User.findOne({ phone: payload.phone });
    if (user) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }
    payload.role = "call-center-agent"
    // 2. create call-center-agent
    const result = await User.create(payload)
    return result;
};
const registerDispatcher = async (payload) => {
    // 1. Check if user exists
    const user = await User.findOne({ phone: payload.phone });
    if (user) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }
    payload.role = "dispatcher"
    // 2. create dispatcher
    const result = await User.create(payload)
    return result;
};
const registerFreelancerTechnician = async (payload) => {
    // 1. Check if user exists
    const user = await User.findOne({ phone: payload.phone });
    if (user) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }
    payload.role = "freelancer-technician"
    // 2. create freelancer-technician
    const result = await User.create(payload)
    return result;
};
const registerInternalTechnician = async (payload) => {
    // 1. Check if user exists
    const user = await User.findOne({ phone: payload.phone });
    if (user) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }
    payload.role = "internal-technician"
    // 2. create internal-technician
    const result = await User.create(payload)
    return result;
};
const registerAdmin = async (payload) => {
    // 1. Check if user exists
    const user = await User.findOne({ phone: payload.phone });
    if (user) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }
    payload.role = "admin"
    // 2. create admin
    const result = await User.create(payload)
    return result;
};

export const UserServices = {
    registerCustomerIntoDB,
    registerCallCenterAgent,
    registerDispatcher,
    registerFreelancerTechnician,
    registerInternalTechnician,
    registerAdmin,
};