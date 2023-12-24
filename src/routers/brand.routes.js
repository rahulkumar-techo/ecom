import expressAsyncHandler from "express-async-handler";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
//
import createbrand from "../controllers/brandController/createbrand.controller.js";
import updatebrand from "../controllers/brandController/updatebrand.controller.js";
import deletebrand from "../controllers/brandController/deletebrand.controller.js";
import getallbrand from "../controllers/brandController/getallbrand.controller.js";
import getbrand from "../controllers/brandController/getbrand.controller.js";

const brand_router = express.Router();

brand_router
  .route("/")
  .post(authMiddleware, isAdmin, expressAsyncHandler(createbrand));
brand_router
  .route("/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(updatebrand));
brand_router
  .route("/:id")
  .delete(authMiddleware, isAdmin, expressAsyncHandler(deletebrand));

brand_router.route("/allbrand").get(expressAsyncHandler(getallbrand));
brand_router.route("/:id").get(expressAsyncHandler(getbrand));

export default brand_router;
