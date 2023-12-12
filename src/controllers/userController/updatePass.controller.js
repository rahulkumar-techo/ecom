import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;

  if (!isValidObjectId(_id)) {
    return new Response(false, 400, "Invalid ObjectId").send(res);
  }

  try {
    const user = await User.findById(_id);

    if (password) {
      // Check if the new password is different from the current password
      if (await user.comparePassword(password)) {
        return new Response(
          false,
          400,
          "New password must be different from the current password"
        ).send(res);
      }

      user.password = password;

      const updatedUser = await user.save();

      return new Response(true, 200, {
        msg: "Password updated",
        updatedUser,
      }).send(res);
    } else {
      return new Response(false, 400, "Password not provided").send(res);
    }
  } catch (error) {
    console.error("Error updating password:", error);

    return new Response(false, 500, {
      msg: "Internal Server Error",
      error,
    }).send(res);
  }
};

export default updatePassword;
