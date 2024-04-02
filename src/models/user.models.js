import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary
      required: true,
    },
    coverImage: {
      type: String, //cloudinary
    },

    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: { type: String },
  },
  { timestamps: true },
);

//pre hook krenge use mongoose ka
//isme password ko hash karne ke liye use karenge
userSchema.pre("save", async function (next) {
  //modify nhi hoga to return
  if (!this.isModified(password)) return next();
  //password,salts ya no.of rounds
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  //compare with the already present password
  return bcrypt.compare(password, this.password);
};

//access token aur fir payload info uske andar
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
//refresh token aur fir payload info uske andar

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

//jwt is bearer token:jiske paas hai token usko data de do

export const User = mongoose.model("User", userSchema);
