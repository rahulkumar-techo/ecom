import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin/admin.middleware.js";

const product_Cat_router = express.Router();

import {
  getAll_Category,
  getCategory,
  updateCategory,
  deleteCategory,
  createNewCategory
} from "../controllers/blogCategoryController/index.js";
import expressAsyncHandler from "express-async-handler";

// Always use RESTful naming conventions
product_Cat_router.route("/categories").post(authMiddleware, isAdmin, expressAsyncHandler(createNewCategory));
product_Cat_router.route("/categories/:id").put(authMiddleware, isAdmin, updateCategory).delete(authMiddleware, isAdmin, expressAsyncHandler(deleteCategory));
product_Cat_router.route("/categories/:id").get(expressAsyncHandler(getCategory));
product_Cat_router.route("/categories").get(expressAsyncHandler(getAll_Category));

export default product_Cat_router;
