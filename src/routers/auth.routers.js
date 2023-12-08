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
router.route("/refresh").get(HandleRefreshToken)

// <=======🔄️==Routers==🔄️===========>
router.route("/register").post(expressAsyncHandler(registerController));
router.route("/login").post(expressAsyncHandler(loginUser));
// getusers
router.route("/get-all").get(expressAsyncHandler(allUser));
router.route("/logout").get(expressAsyncHandler(logout))
router.route("/:id").get(authMiddleware, expressAsyncHandler(singleUser));


//deleteuser or deleteUsers
router.route("/:id").delete(expressAsyncHandler(deleteUser));

//updates
router.route("/edit-user").put(authMiddleware, expressAsyncHandler(updateUser));

// block unblock
router
  .route("/blocked-user/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(blockUser));

router
  .route("/unblock-user/:id")
  .put(authMiddleware, isAdmin, expressAsyncHandler(unblockUser));

export default router;