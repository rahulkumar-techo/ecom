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
//<======🔅=route=🔅=======>
const product_router = express.Router();
product_router.route("/wishlist").put(authMiddleware, expressAsyncHandler(wishList));
product_router.route("/rating").put(authMiddleware,isAdmin,expressAsyncHandler(ratingController));
product_router.route("/").post(expressAsyncHandler(createProduct));
product_router.route("/get-all").get(expressAsyncHandler(getAllProduct));
product_router.route("/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateProduct));
product_router.route("/:id").delete(authMiddleware,isAdmin,expressAsyncHandler(deleteProduct));
product_router.route("/:id").get(authMiddleware,isAdmin,expressAsyncHandler(getProduct));



export default product_router;
