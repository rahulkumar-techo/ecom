import Category from "../../models/category.model.js";
import Response from "../../../Handler/Response.js";
import { isValidObjectId } from "mongoose";

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new Response(false, 400, " Invalid").send(res);
    }

    if (!req?.params) {
      return new Response(false, 400, "id not defined").send(res);
    }

    const delete_category = await Category.findByIdAndDelete(id);

    if (!delete_category) {
      return new Response(false, 500, "category not updated").send(res);
    }
    return new Response(false, 200, delete_category).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default deleteCategory;
