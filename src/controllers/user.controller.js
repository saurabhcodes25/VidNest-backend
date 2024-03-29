import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation-not empty,valid email,username
  //check if user already exists-email & username
  //images avatar -upload them to cloudinary

  const { fullName, email, username, password } = req.body;

  res.status(201).json({ message: "User registered successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged in successfully" });
});

export { registerUser, loginUser };
