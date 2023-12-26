
import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import expressAsyncHandler from "express-async-handler";

import upload from "../middlewares/multer.middleware.js";
import { deleteImages, uploadImages } from "../utils/cloudinary.utils.js";


const upload_router = express.Router();


upload_router.post(
    "/product/:id",
    authMiddleware,
    isAdmin,
    upload.array("images", 10),
    // ,
   expressAsyncHandler(uploadImages)
  );
  
  upload_router.delete("/delete-img/:id", authMiddleware, isAdmin,  expressAsyncHandler(deleteImages));

export default upload_router;