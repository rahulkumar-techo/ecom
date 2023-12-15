import BCategory from "../../models/blogCat.model.js";
import Response from "../../../Handler/Response.js";
const createblogCat = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return new Response(
        false,
        400,
        "Title is required. Please add a title."
      ).send(res);
    }

    const newblogCat = await BCategory.create({ title });

    if (!newblogCat) {
      return new Response(
        false,
        500,
        "Category not created. Something went wrong."
      ).send(res);
    }

    return new Response(true, 200, newblogCat).send(res);
  } catch (error) {
    console.error("Error creating category:", error);

    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default createblogCat;
