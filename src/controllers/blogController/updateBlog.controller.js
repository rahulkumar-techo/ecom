
import Blog from "../../models/blog.model.js";

const updateBlogs = async (req, res) => {
  const { id } = req.params;

  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
};
export default updateBlogs;