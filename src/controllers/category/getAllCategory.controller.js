import Category from "../../models/category.model.js";
import Response from "../../../Handler/Response.js";

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return new Response(
        false,
        500,
        "Category not created. Something went wrong."
      ).send(res);
    }

    return new Response(true, 200, categories).send(res);
  } catch (error) {
    console.error("Error creating category:", error);

    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default getAllCategory;
