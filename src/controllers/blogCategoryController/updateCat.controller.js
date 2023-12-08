import Response from "../../../Handler/Response.js";
import BlogCatProduct from "../../models/blogProductCategory.model.js";
import validateMongoDbId from "../../utils/validateMoongoDbId.utils.js";

const updateCategory = async (req, res, next) => {
  const { id } = req.params; // Correctly getting id from req.params
  const { title } = req.body;
  validateMongoDbId(id);

  try {
    if (!title) {
      return new Response(false, 401, "Invalid Input field").send(res);
    }

    const updateCat = await BlogCatProduct.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!updateCat) {
      return new Response(false, 401, `Unable to update blog category`).send(
        res
      );
    }

    return new Response(true, 200, `Category updated successfully`).send(res);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error updating category:", error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default updateCategory;
