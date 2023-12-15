import BCategory from "../../models/blogCat.model.js";
import Response from "../../../Handler/Response.js";

const getAllBlogCat = async (req, res) => {
  try {
    const blogcat = await BCategory.find();
    if (!blogcat) {
      return new Response(false, 500, "Data not found").send(res);
    }
    new Response(true, 200, blogcat).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllBlogCat;
