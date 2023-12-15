import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import Blog from "../../models/blog.model.js";

const getIndividualBlog = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return new Response(false, 500, "Object id not valid ").send(res);
    }

    const individualBlog = await Blog.findById(id);
    const incViews = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );

    if ((!individualBlog && !incViews) || !incViews || !individualBlog) {
      return new Response(
        false,
        500,
        "blog and view or Individual not updated "
      ).send(res);
    }
    console.log({"views": incViews.numViews});
    return new Response(true, 201, individualBlog).send(res);

  } catch (error) {
    throw new Error(error);
  }
};

export default getIndividualBlog;
