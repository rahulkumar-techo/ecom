
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin/admin.middleware.js";

// Categories functions for req,res
import createCategory from "../controllers/category/createCategory.controller.js";
import expressAsyncHandler from "express-async-handler";

import updateCategory from "../controllers/category/updateCategory.controller.js";
import deleteCategory from "../controllers/category/deleteCategory.controller.js";
import getAllCategory from "../controllers/category/getAllCategory.controller.js";
import getCategory from "../controllers/category/getCategory.controller.js";

const categories_route = express.Router();

categories_route.route("/").post(authMiddleware,isAdmin,expressAsyncHandler(createCategory));
categories_route.route("/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateCategory));
categories_route.route("/:id").delete(authMiddleware,isAdmin,expressAsyncHandler(deleteCategory));
categories_route.route("/all-category").get(expressAsyncHandler(getAllCategory))
categories_route.route("/:id").get(expressAsyncHandler(getCategory))


export default categories_route;