import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );
    if (!user) {
      //frontend se token aya but user db me nahi hai
      throw new ApiError(404, "Invalid Access Token");
      req.user = user;
      next();
    }
  } catch (error) {
    throw new ApiError(401, "Invalid Acess Token");
  }
});
