import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";

const deleteUser = async(req,res,next) =>{

  const { id } = req.params;

    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json(new Response(false, 404, "User not found"));
      }
  
      const response = new Response(true, 200, `user delete ${id}`);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json(new Response(false, 500, "Internal Server Error",error));
    }
}

export default deleteUser;