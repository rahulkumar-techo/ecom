import Blog from "../../models/blog.model.js";
import Response from "../../../Handler/Response.js";


const createBlog = async (req, res) => {
  const { title, description, category } = req.body;
  console.log(title, description, category);
  try {
    if (!title || !description || !category) {
      return new Response(
        false,
        201,
        `Invalid Input: Title, Descriptions, and Category are required`
      ).send(res);
    }
    const newBlog = await Blog.create(req.body);
    new Response(true, 200, newBlog).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default createBlog;
