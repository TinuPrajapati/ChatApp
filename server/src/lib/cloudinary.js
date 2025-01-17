import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer"
import {CloudinaryStorage} from "@fluidjs/multer-cloudinary"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_name,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECERT,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chats",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export {cloudinary,upload};
