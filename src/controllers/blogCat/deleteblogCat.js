import BCategory from "../../models/blogCat.model.js";
import Response from "../../../Handler/Response.js";
import { isValidObjectId } from "mongoose";

const deleteblogCat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new Response(false, 400, "Invalid ID").send(res);
    }

    const deletedBlogCat = await BCategory.findByIdAndDelete(id);
    console.log(deletedBlogCat);
    if (!deletedBlogCat) {
      return new Response(false, 500, "Category not deleted").send(res);
    }

    return new Response(true, 200, deletedBlogCat).send(res);
  } catch (error) {
    console.error("Error deleting blog category:", error);
    // Send a generic error response
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default deleteblogCat;
