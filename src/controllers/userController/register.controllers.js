import User from "../../models/user.model.js";
import Response from "../../../Handler/Response.js";

const registerController = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Validation: Check if email is provided
    if (!email) {
      return new Response(false, 400, `Email is required`).send(res);
    }

    // Check if the user with the provided email already exists
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return new Response(false, 400, `User with this email already exists`).send(res);
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    if (!savedUser) {
      return new Response(false, 500, `User not created`).send(res);
    }

    return new Response(true, 200, `User created successfully`).send(res);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(false, 500, error.message || "Internal Server Error").send(res);
  }
};

export default registerController;
