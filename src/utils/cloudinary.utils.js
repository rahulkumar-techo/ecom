import cloudinary from "cloudinary";
import Blog from "../models/blog.model.js";
import Response from "../../Handler/Response.js";
import sharp from "sharp";
import fs from "fs";
import Product from "../models/product.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.files || req.files.length === 0) {
      return new Response(false, 500, "No files provided").send(res);
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return new Response(
        false,
        500,
        "Cloudinary configuration is incomplete"
      ).send(res);
    }

    const urls = [];
    let imageDetails = {};
    for (const file of req.files) {
      const { path } = file;
      const newpath = await cloudinary.uploader.upload(path, {
        folder: "images",
      });
      imageDetails = newpath;
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

    if (!findBlog) {
      const find_product = await Product.findByIdAndUpdate(
        id,
        {
          images: urls.map((file) => file.url),
        },
        {
          new: true,
        }
      );
      if (!find_product) {
        return new Response(false, 500, "Product images not upload");
      }
      // details For product
      return new Response(true, 201, {
        details: {
          width: imageDetails.width,
          height: imageDetails.height,
          public_id:imageDetails.public_id,
          size: `${(imageDetails.bytes / (1024 * 1024)).toFixed(2)} MB`,
        },
        find_product,
      }).send(res);
    }
    // Details for Blogs
    return new Response(true, 201, {
      details: {
        width: imageDetails.width,
        height: imageDetails.height,
        public_id:imageDetails.public_id,
        size: `${(imageDetails.bytes / (1024 * 1024)).toFixed(2)} MB`,
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

  const destDirectory = "public/blog/";
  if (!fs.existsSync(destDirectory)) {
    fs.mkdirSync(destDirectory, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/${file.filename}`);
      fs.unlinkSync(`public/images/${file.filename}`);
    })
  );
  next();
};
// Use only the public_id (which is the id in this case) to identify the image to be deleted.
const deleteImages = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await cloudinary.uploader.destroy(id, {
      resource_type: "auto",
    });

    console.log("Deleted:", result);

    // Send a success response
    new Response(true, 200, result).send(res);
  } catch (error) {
    // Handle the error and send an error response
    console.error("Error deleting image:", error);
    new Response(false, 500, "Internal Server Error").send(res);
  }
};

export { uploadImages, blogImgResize, deleteImages };
