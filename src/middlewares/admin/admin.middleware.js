import expressAsyncHandler from "express-async-handler";
import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";

const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.user;

  try {

    if(!email){
      return new Response(false, 401, "Not a valid email form admin").send(res);
    }
    const adminUser = await User.findOne({ email });

    if (!adminUser || adminUser.role !== "admin") {
      return new Response(false, 401, "Not a valid admin user").send(res);
    } else {
      console.log("Admin successfully logged in");
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json(new Response(false, 500, `Admin auth crashed: ${error.message}`));
  }
});

export default isAdmin;
