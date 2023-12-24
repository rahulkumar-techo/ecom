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


// refresh token
router.route("/refresh").get(HandleRefreshToken);

// <=======🔄️==Routers [register and login]==🔄️===========>
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
