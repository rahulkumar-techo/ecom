
import expressAsyncHandler from "express-async-handler";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
import { createColor, deleteColor, getAllColor, getColor, updateColor } from "../controllers/color/color.controller.js";

const color_router = express.Router();

color_router.route("/").post(authMiddleware,isAdmin,expressAsyncHandler(createColor));
color_router.route("/:id").delete(authMiddleware,isAdmin,expressAsyncHandler(deleteColor));
color_router.route("/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateColor));
color_router.route("/").get(expressAsyncHandler(getAllColor));
color_router.route("/:id").get(expressAsyncHandler(getColor));


export default color_router;