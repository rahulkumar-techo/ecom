
import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import expressAsyncHandler from "express-async-handler";
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "../controllers/couponController/coupon.controller.js";
const coupon_router = express.Router();

coupon_router.route("/").post(authMiddleware,isAdmin,expressAsyncHandler(createCoupon))
coupon_router.route("/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateCoupon))
coupon_router.route("/:id").delete(authMiddleware,isAdmin,expressAsyncHandler(deleteCoupon))
coupon_router.route("/").get(expressAsyncHandler(getAllCoupons))
coupon_router.route("/:id").get(expressAsyncHandler(getCoupon))


export default coupon_router;