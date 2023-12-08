import Response from "../../Handler/Response.js";
import User from "../models/user.model.js";

const logout = async (req, res) => {
  const cookie = req.cookies;

  try {
    if (!(cookie?.refreshToken)) {
      throw new Error("Refresh token not found");
    }

    const refreshToken = cookie.refreshToken;

    // Check if the user with the given refresh token exists
    const user = await User.findOne({ refreshToken });
    console.log(refreshToken)

    if (!user) {
      // If user not found, clear the refresh token cookie and return
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });

      return new Response(true, 200, "User logout").send(res);
    }

    // Update the user's refresh token to an empty string
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return new Response(true, 200, "User logout").send(res);
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default logout;
