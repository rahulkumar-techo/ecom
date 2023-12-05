import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";


const allUser = async (req,res,next)=>{

    try {
        // find all user
        const user =await User.findOne()
        
        new Response(true,200,user).send(res)
        
    } catch (error) {
        
        throw new Error("all user not set properly")
    }
}

export default allUser;