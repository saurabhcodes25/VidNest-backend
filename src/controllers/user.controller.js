import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiErrors.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty,valid email,username
  //check if user already exists-email & username
  //images and avatar -upload them to cloudinary
  //create user object
  //remove refresh token and password from response
  //check for user creation
  //return response

  const { fullName, email, username, password } = req.body;

  //basic method
  // if(fullName==="")throw new ApiError(400,"Fullname is required");
  //similarly for email,username,password

  //better method
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const ExistingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (ExistingUser) throw new ApiError(409, "User already exists");
  console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Please upload avatar");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "avatar is required");

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) throw new ApiError(500, "User not created properly");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged in successfully" });
});

export { registerUser, loginUser };
