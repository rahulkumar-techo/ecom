
import expressAsyncHandler from "express-async-handler";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
import { createEnquiry, deleteEnquiry, getAllEnquiry, getEnquiry, updateEnquiry } from "../controllers/enquiry/enquiry.controller.js";
const enquiry_router = express.Router();

enquiry_router.route("/").post(expressAsyncHandler(createEnquiry));
enquiry_router.route("/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateEnquiry));
enquiry_router.route("/:id").delete(authMiddleware,isAdmin,expressAsyncHandler(deleteEnquiry));
enquiry_router.route("/:id").get(expressAsyncHandler(getEnquiry));
enquiry_router.route("/").get(expressAsyncHandler(getAllEnquiry));


export default enquiry_router;