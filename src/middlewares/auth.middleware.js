import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Response from "../../Handler/Response.js";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json(new Response(false, 500, "Please login your account"));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Token verification failed" });
      }

      // Token is valid, set user information in req.user
      req.user = decoded;

      console.log({
        "Decoded Token:": decoded,
        msg: "user authenticated"
      });

      // Move to the next middleware or route handler
      next();
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized token, please login" });
  }
});

export default authMiddleware;
