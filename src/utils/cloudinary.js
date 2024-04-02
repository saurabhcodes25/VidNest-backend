import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//cloudinary upload

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload on cloudnary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("FIle uploaded successfuly on cloudinary", res.url);
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {

    //remove the locally saved temp file as upload failed
    fs.unlinkSync(localFilePath)
  }
};

export  {uploadOnCloudinary};