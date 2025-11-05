import ApiError from "../../errors/ApiError.js";
import { User } from "./user.model.js";
import httpStatus from "http-status";

// ==========================
const registerUserIntoDB = async (payload) => {
    // 1. Check if user exists
    const existingUser = await User.findOne({ phone: payload.phone });
    if (existingUser) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }

    // 3. Create user
    const user = new User({
        name: payload.name,
        phone: payload.phone
    });

    const result = await user.save();
    return result;
};

export const UserServices = {
    registerUserIntoDB
};