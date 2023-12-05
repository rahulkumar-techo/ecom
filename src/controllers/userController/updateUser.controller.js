import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";


const updateUser = async(req,res,next) =>{

    const id= req.user.userId;
    const {username,email,phone} =req.body;

    try {
        if(!username || !email ||!phone){
            return new Response(false,400,"Invalid input")
        }

      const user = await User.findByIdAndUpdate(id,{
        username,email,phone
      });
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json(new Response(false, 404, "User not found"));
      }
  
      const response = new Response(true, 200, `user update ${id}`);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json(new Response(false, 500, "Internal Server Error"));
    }
}

export default updateUser;