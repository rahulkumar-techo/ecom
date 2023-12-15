import express from "express";
import createBlog from "../controllers/blogController/createBlog.controller.js";
import expressAsyncHandler from "express-async-handler";
import getAllBlog from "../controllers/blogController/getAllBlog.controller.js";
import updateBlogs from "../controllers/blogController/updateBlog.controller.js";
import getIndividualBlog from "../controllers/blogController/getIndividualBlog.js";
//authnetication
import isAdmin from "../middlewares/admin/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import deleteBlog from "../controllers/blogController/deleteBlog.controller.js";
import {like_blog ,dislike_blog} from "../controllers/blogController/like&dislike.controller.js";

const blog_router = express.Router();

blog_router
  .route("/create-blog")
  .post(authMiddleware, isAdmin, expressAsyncHandler(createBlog));
blog_router.route("/all-blogs").get(expressAsyncHandler(getAllBlog));

blog_router.route("/update-blogs/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateBlogs))

blog_router
  .route("/individual-blog/:id")
  .get( expressAsyncHandler(getIndividualBlog));

blog_router
  .route("/delete-blog/:id")
  .delete(authMiddleware, isAdmin, expressAsyncHandler(deleteBlog));

  // LIKE AND DISLIKE
  blog_router.route("/likes").put(authMiddleware,expressAsyncHandler(like_blog ))
  blog_router.route("/dislikes").put(authMiddleware,expressAsyncHandler(dislike_blog ))

export default blog_router;
