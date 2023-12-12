import crypto from "crypto";
import User from "../../models/user.model.js";
import { BadRequestError, NotFoundError } from "../../../Handler/ErrorHandler.js";

const reset_password = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  console.log(token)

  try {
    // Validate password
    if (!password || typeof password !== "string") {
      throw new BadRequestError("Invalid password format");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new NotFoundError("Token expired or invalid, please request a new one");
    }

    // Update user's password and reset token fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);

    // Handle all errors with appropriate HTTP status codes
    if (error instanceof BadRequestError) {
      return res.status(400).json({ error: error.message });
    } else if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    } else {
      // Generic error response for unhandled errors
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default reset_password;
