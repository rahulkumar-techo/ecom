import express from "express";
import expressAsyncHandler from "express-async-handler";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// Product Files imported
import createProduct from "../controllers/productController/createProduct.controller.js";
import updateProduct from "../controllers/productController/updateProduct.controller.js";
import deleteProduct from "../controllers/productController/deleteProduct.controller.js";
import getProduct from "../controllers/productController/getProduct.controller.js";
import getAllProduct from "../controllers/productController/getAllProduct.controller.js";
import { wishList } from "../controllers/productController/wishListProduct.contoller.js";
import ratingController from "../controllers/productController/rating.controller.js";
import cloudinaryUtils, {
  productImgResize,
} from "../utils/cloudinary.utils.js";
import upload from "../middlewares/multer.middleware.js";
//<======🔅=route=🔅=======>
const product_router = express.Router();
product_router
  .route("/wishlist")
  .put(authMiddleware, expressAsyncHandler(wishList));
product_router
  .route("/rating")
  .put(authMiddleware, expressAsyncHandler(ratingController));
product_router.route("/get-all").get(expressAsyncHandler(getAllProduct));
product_router
  .route("/")
  .post(authMiddleware, isAdmin, expressAsyncHandler(createProduct));
product_router
  .route("/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(updateProduct));
product_router
  .route("/:id")
  .delete(authMiddleware, isAdmin, expressAsyncHandler(deleteProduct));
product_router.route("/:id").get(expressAsyncHandler(getProduct));
product_router
  .route("/upload-images/:id")
  .put(
    authMiddleware,
    productImgResize,
    upload.array("product-image", 5),
    expressAsyncHandler(cloudinaryUtils)
  );

export default product_router;
