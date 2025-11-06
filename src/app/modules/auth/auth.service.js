import { User } from "../user/user.model.js";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import config from "../../../config/index.js";
import { JWTHelpers } from "../../helpers/jwtHelpers.js";

// ================= LOGIN =================
const loginUser = async (payload) => {
    //  Find user by email
    const userData = await User.findOne({ phone: payload.phone });
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    //  Generate access token
    const accessToken = JWTHelpers.generateToken(
      {
        id: userData._id,
        name: userData.name,
        phone: userData.phone,
      },
      config.jwt_access_secret,
      config.jwt_access_expires_in || "7d"
    );

    // Return user info + token
    return {
      accessToken,
      user: {
        id: userData._id,
        name: userData.name,
        phone: userData.phone,
      },
    };
};

export const AuthServices = {
  loginUser
}