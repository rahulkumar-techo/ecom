import expressAsyncHandler from "express-async-handler";
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import {
  createCatProduct,
  deleteProductCat,
  getAll_productCat,
  update_productCat,
} from "../controllers/productCategory/productCat.controller.js";

const productCat_route = express.Router();

// routes:
productCat_route
  .route("/")
  .post(authMiddleware, isAdmin, expressAsyncHandler(createCatProduct));
productCat_route
  .route("/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(update_productCat));
productCat_route
  .route("/:id")
  .delete(authMiddleware, isAdmin, expressAsyncHandler(deleteProductCat));
productCat_route
  .route("/")
  .get( expressAsyncHandler(getAll_productCat));
productCat_route
  .route("/:id")
  .get( expressAsyncHandler(getAll_productCat));

  export default productCat_route;