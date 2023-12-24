import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import Blog from "../../models/blog.model.js";

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  console.log(id, "delete blog");

  try {
    if (!isValidObjectId(id))
      return new Response(false, 500, "Invalid Object Id").send(res);

    const delete_blog = await Blog.findByIdAndDelete(id);
    
    if (!delete_blog) {
      return new Response(false, 500, "Blog not deleted");
    }
    console.log("deleted");
    new Response(true, 201, delete_blog).send(res).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default deleteBlog;
