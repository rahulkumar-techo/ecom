import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Response from "../../Handler/Response.js";
import User from "../models/user.model.js";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json(new Response(false, 401, "Please login your account"));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      console.log("authentication not decoded")
    }
    const user = await User.findOne({refreshToken:token});
    req.user = user;
 
    console.log({
      "Decoded Token:": decoded,
      msg: "user authenticated",
    });    
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Not authorized token, please login" });
  }
});

export default authMiddleware;
