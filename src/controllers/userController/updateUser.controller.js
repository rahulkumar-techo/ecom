import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";

const updateUser = async (req, res) => {
  try {
    // Ensure req.user is defined and has an 'id' property
    if (!req.user || !req.user._id) {
      return res.status(401).json(new Response(false, 401, "Unauthorized"));
    }

    const userId = req.user.id; // Assuming req.user contains the user object
    const { username, email, phone } = req.body;

    console.log(userId); // Logging the user ID for verification purposes

    if (!username || !email || !phone) {
      return res.status(400).json(new Response(false, 400, "Invalid input"));
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      username,
      email,
      phone,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json(new Response(false, 404, "User not found"));
    }

    new Response(true, 200, `User ${userId} updated successfully`).send(res);
  } catch (error) {
    console.error("Error during updateUser:", error);
    res.status(500).json(new Response(false, 500, "Internal Server Error & email shold be unique"));
  }
};

export default updateUser;
