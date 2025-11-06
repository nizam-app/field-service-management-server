import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config/index.js";

// 🔧 Cloudinary Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// ✅ Use Memory Storage (no filesystem write)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔼 Upload single file buffer to Cloudinary
const uploadToCloudinary = async (file, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("Invalid file or empty buffer"));
    }

    const base64File = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    cloudinary.uploader.upload(
      base64File,
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

// 🔼 Upload multiple files
const uploadMultipleToCloudinary = async (files, resourceType = "image") => {
  const results = [];
  for (const file of files) {
    const res = await uploadToCloudinary(file, resourceType);
    results.push(res);
  }
  return results;
};

// 🔼 Upload video
const uploadVideoToCloudinary = async (file) => {
  return uploadToCloudinary(file, "video");
};

// 🔼 Upload multiple videos
const uploadMultipleVideoToCloudinary = async (files) => {
  return uploadMultipleToCloudinary(files, "video");
};

// 🧾 Upload PDF buffer (for invoices etc.)
const uploadPdfBuffer = async (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const base64File = `data:application/pdf;base64,${buffer.toString("base64")}`;
    cloudinary.uploader.upload(
      base64File,
      { public_id: publicId || Date.now(), resource_type: "raw" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  uploadVideoToCloudinary,
  uploadMultipleVideoToCloudinary,
  uploadPdfBuffer,
};