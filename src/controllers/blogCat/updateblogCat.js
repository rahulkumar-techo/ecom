import BCategory from "../../models/blogCat.model.js";
import Response from "../../../Handler/Response.js";
import { isValidObjectId } from "mongoose";

const updateblogCat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new Response(false, 400, "Invalid ID").send(res);
    }

    if (!id) {
      return new Response(false, 400, "ID not defined").send(res);
    }

    const updatedBlogCat = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBlogCat) {
      return new Response(false, 500, "Category not updated").send(res);
    }

    return new Response(true, 200, updatedBlogCat).send(res);
  } catch (error) {
    console.error("Error updating blog category:", error);

    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default updateblogCat;
