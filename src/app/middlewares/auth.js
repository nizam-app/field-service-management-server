import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';
import config from '../../config/index.js';
import { User } from '../modules/user/user.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const auth = (...requiredRole) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(401, 'You are not authorized');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret);
    } catch (err) {
      throw new ApiError(401, 'Invalid token');
    }

    const { id, role } = decoded;
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new ApiError(401, 'You are not authorized');
    }

    req.user = decoded;
    next();
  });
};

export default auth;