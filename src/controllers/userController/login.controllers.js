import Response from "../../../Handler/Response.js";
import generateToken from "../../configs/jwtToken.js";
import generateRefreshToken from "../../configs/refreshToken.js";
import User from "../../models/user.model.js";


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

    // Generate refresh token and update it in the user document
    const refreshToken = generateRefreshToken(foundUser?.id);
    const updateUser = await User.findByIdAndUpdate(foundUser.id, { refreshToken }, { new: true });

    if (!refreshToken) {
      return res.status(500).json(new Response(false, 500, `Token not found while login`));
    }

    // Store the token in a cookie
    const expirationDate = new Date(Date.now() + 9000000);
    res.cookie("refreshToken", refreshToken, { expires: expirationDate, httpOnly: false });
    console.log(`User has logged in successfully 🍀 `);

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
