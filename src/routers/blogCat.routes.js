import isAdmin from "../middlewares/admin/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
//
import createblogCat from "../controllers/blogCat/createblogCat.controller.js";
import deleteblogCat from "../controllers/blogCat/deleteblogCat.js";
import updateblogCat from "../controllers/blogCat/updateblogCat.js";

import getblogCat from "../controllers/blogCat/getblogCat.js";
import expressAsyncHandler from "express-async-handler";
import getAllBlogCat from "../controllers/blogCat/getallblogCat.js";

const blogCat_router = express.Router();

blogCat_router
  .route("/")
  .post(authMiddleware, isAdmin, expressAsyncHandler(createblogCat));
blogCat_router
  .route("/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(updateblogCat));
blogCat_router
  .route("/:id")
  .delete(authMiddleware, isAdmin, expressAsyncHandler(deleteblogCat));

blogCat_router
  .route("/allblog-cat")
  .get(expressAsyncHandler(getAllBlogCat));
blogCat_router.route("/:id").get(expressAsyncHandler(getblogCat));

export default blogCat_router;
