import expressAsyncHandler from "express-async-handler";
import Response from "./Response.js";
import User from "../src/models/user.model.js";
import jwt from "jsonwebtoken";
import generateRefreshToken from "../src/configs/refreshToken.js";

const HandleRefreshToken = expressAsyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
      throw new Error("No refresh token provided in the request");
    }
    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      throw new Error("No user found for the given refresh token");
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("Refresh token not verified");
      }

    //  generate new Access tokens; // always gives a new token
    const acesstoken = generateRefreshToken(user?._id)
    console.log({acesstoken})

    });

    new Response(true, 200, { user, msg: "Got refresh token 🍀" }).send(res);
  } catch (error) {
    console.error("Error handling refresh token:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default HandleRefreshToken;
