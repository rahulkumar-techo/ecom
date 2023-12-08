import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";

const blockUser = async (req, res) => {
  const {id} = req.params; 
  console.log(id)

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      isBlocked: true,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json(new Response(false, 404, "User not found"));
    }

    new Response(true, 200, `User ${id} blocked successfully`).send(res);
  } catch (error) {
    console.error(error);
    res.status(500).json(new Response(false, 500, "Internal Server Error"));
  }
};

export default blockUser;


const unblockUser = async (req, res) => {
  const  {id} = req.params;

  try {
    const unblock = await User.findByIdAndUpdate(id, {
      isBlocked: false,
      new: true,
    });

    new Response(true, 200, "user Unblocked suceess fully ").send(res);
  } catch (error) {
    throw new Error({ blocked: error });
  }
};

export { blockUser, unblockUser };
