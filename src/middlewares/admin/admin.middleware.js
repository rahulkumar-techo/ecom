import User from "../../models/user.model.js";
import Response from "../../../Handler/Response.js"

const isAdmin = async (req, res, next) => {
  // already set in auth.middleware file
  const { email } = req.user;
  try {
    const adminUser = User.findOne({ email });
    if (adminUser.role !== "admin") {
      throw new Error("you are not a admin");
    } else {
      next();
    }
  } catch (error) {
    new Response(false,500,`Admin auth crashed`)
  }
};

export default isAdmin;
