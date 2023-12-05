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


// <=======🔄️==Routers==🔄️===========> 
// 
router.route("/register").post(expressAsyncHandler(registerController));
router.route("/login").post(expressAsyncHandler(loginUser));
// getusers
router.route("/get-all").get(expressAsyncHandler(allUser));
router.route("/:id").get(authMiddleware,expressAsyncHandler(singleUser))
//deleteuser or deleteUsers
router.route("/:id").delete(expressAsyncHandler(deleteUser))

//updates
router.route("/edit-user").put(authMiddleware,expressAsyncHandler(updateUser))

export default router;
