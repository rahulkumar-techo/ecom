import express from "express";
const router = express.Router();

// import all files
import expressAsyncHandler from "express-async-handler";
import registerController from "../controllers/userController/register.controllers.js";
import loginUser from "../controllers/userController/login.controllers.js";
import singleUser from "../controllers/userController/singleUser.controller.js";
import allUser from "../controllers/userController/allUser.controller.js";
import deleteUser from "../controllers/userController/deleteUser.controller.js";
import updateUser from "../controllers/userController/updateUser.controller.js";

// <=======🔄️==Middleares import file==🔄️===========>
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin/admin.middleware.js";
import {
  blockUser,
  unblockUser,
} from "../controllers/blockUnblock/blockUnblock.controller.js";

// <=============Refresh token============>
// Getting refresh Token from Handler repo.
import HandleRefreshToken from "../../Handler/HandleRefreshToken.js";
import logout from "../controllers/logoutUser.controller.js";
import updatePassword from "../controllers/userController/updatePass.controller.js";
import forgotPassToken from "../controllers/userController/forgotPassToken.controller.js";
import reset_password from "../controllers/userController/resetPassword.controller.js";
import { applyCoupon, emptyCart, getUserCart, getwishlistUser, userCart } from "../controllers/userController/component.controller.js";
import { createOrder, getAllOrders, getOrders, saveAddress, updateOrderStatus } from "../controllers/userController/order.controller.js";


// refresh token
router.route("/refresh").get(HandleRefreshToken);

// <=======🔄️==Routers [register and login]==🔄️===========>
router.route("/applycoupon").post(authMiddleware,expressAsyncHandler(applyCoupon));
router.route("/emptycart").delete(authMiddleware,expressAsyncHandler(emptyCart));
router.route("/cart").get(authMiddleware,expressAsyncHandler(getUserCart));
router.route("/cart").post(authMiddleware,expressAsyncHandler(userCart));
router.route("/wishlist").get(authMiddleware,expressAsyncHandler(getwishlistUser));
// ORDERs
router.route("/get-order").get(authMiddleware,expressAsyncHandler(getOrders));
router.route("/getallorder").get(authMiddleware,isAdmin,expressAsyncHandler(getAllOrders));
router.route("/getorderbyuser/:id").post(authMiddleware,isAdmin,expressAsyncHandler(getAllOrders));
router.route("/save-address").put(authMiddleware,expressAsyncHandler(saveAddress))
router.route("/order/update-order/:id").put(authMiddleware,isAdmin,expressAsyncHandler(updateOrderStatus))
router.route("/cart/cash-order").post(authMiddleware,isAdmin,expressAsyncHandler(createOrder))
// loging
router.route("/register").post(expressAsyncHandler(registerController));
router.route("/login").post(expressAsyncHandler(loginUser));

// getusers,logout,singleuser
router.route("/get-all").get(expressAsyncHandler(allUser));
router.route("/logout").get(authMiddleware, expressAsyncHandler(logout));
router.route("/:id").get(authMiddleware, expressAsyncHandler(singleUser));

//deleteuser or deleteUsers
router.route("/:id").delete(expressAsyncHandler(deleteUser));

//updates password and user
router.route("/edit-user").put(authMiddleware, expressAsyncHandler(updateUser));

router
  .route("/update-password/:id")
  .put(authMiddleware, expressAsyncHandler(updatePassword));

router
  .route("/forgot-password-token")
  .post(expressAsyncHandler(forgotPassToken));

router.route("/reset-password/:token").put(expressAsyncHandler(reset_password));
// block unblock
router
  .route("/blocked-user/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(blockUser));

router
  .route("/unblock-user/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(unblockUser));






export default router;
