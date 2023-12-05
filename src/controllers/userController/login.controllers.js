import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation: Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json(new Response(false, 400, `Invalid input`));
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json(new Response(false, 400, `Invalid User`));
    }

    const isPasswordMatched = await foundUser.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json(new Response(false, 400, `Invalid password`));
    }

    // Create JWT token
    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);
    console.log(token);

    // Check the tokens Limit
    const maxTokenLimit = 3;
    if (foundUser.tokens.length >= maxTokenLimit) {
      foundUser.tokens.shift();
    }

    // Push the new token into the tokens array
    foundUser.tokens.push({ token });

    // Save the user document to persist the changes
    await foundUser.save();

    // Store the token in a cookie
    const expirationDate = new Date(Date.now() + 9000000); // 15 minutes from now
    res.cookie("jwtToken", token, { expires: expirationDate, httpOnly: false });

    console.log("User has logged in successfully 🍀");

    // Return a response indicating a successful login
    return res.status(200).json(new Response(true, 200, { userId: foundUser }));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new Response(false, 500, error.message || "Internal Server Error"));
  }
};

export default loginUser;