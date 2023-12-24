import cloudinary from "cloudinary";
import Blog from "../models/blog.model.js";
import Response from "../../Handler/Response.js";
import sharp from "sharp";
import { isValidObjectId } from "mongoose";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.files || req.files.length === 0) {
      return new Response(false, 500, "No files provided").send(res);
    }

    // Check if Cloudinary configuration is valid
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return new Response(false, 500, "Cloudinary cloud name is missing").send(res);
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      return new Response(false, 500, "Cloudinary API key is missing").send(res);
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      return new Response(false, 500, "Cloudinary API secret is missing").send(res);
    }

    const urls = [];
    let imageDetails ={};
    for (const file of req.files) {
      const { path } = file;
      const newpath = await cloudinary.uploader.upload(path, "images");
      // console.log(newpath);
      imageDetails=newpath;
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    // Update the Blog document
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file.url),
      },
      {
        new: true,
      }
    );

    console.log(findBlog.images.length);

    // Check if newBlog is null (no document found to update)
    if (!findBlog) {
      return new Response(false, 404, "Blog not found").send(res);
    }

    return new Response(true, 201, {
      details:{
        width:imageDetails.width,
        height:imageDetails.height,
        size:`${(imageDetails.bytes/(1024*1024)).toFixed(2)} MB`
      },
      findBlog,
    }).send(res);
  } catch (error) {
    console.error("Error in uploading file:", error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  const destDirectory = 'public/blog/';
  if (!fs.existsSync(destDirectory)) {
    fs.mkdirSync(destDirectory, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/blog/${file.filename}`);
      fs.unlinkSync(`public/blog/${file.filename}`);
    })
  );
  next();
};
// Product Image Resize <===RESIZED====>

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/products/${file.filename}`);
      fs.unlinkSync(`public/products/${file.filename}`);
    })
  );
  next();
};
export { blogImgResize };
