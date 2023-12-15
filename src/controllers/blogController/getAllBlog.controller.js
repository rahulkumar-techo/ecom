import Response from "../../../Handler/Response.js";
import Blog from "../../models/blog.model.js";
const getAllBlog = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    new Response(true, 201, allBlogs).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllBlog;
