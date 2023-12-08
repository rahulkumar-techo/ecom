import Response from "../../../Handler/Response.js";
import BlogCatProduct from "../../models/blogProductCategory.model.js";

const createNewCategory = async (req, res, next) => {
  const { title } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await BlogCatProduct.findOne({ title });

    if (existingCategory) {
      return new Response(false, 401, `Category with title '${title}' already exists`).send(res);
    }

    // Create a new category
    const newCategory = new BlogCatProduct({
      title,
    });

    // Save the new category to the database
    await newCategory.save();

    // Send a success response
    return new Response(true, 200, "Category created successfully").send(res);
  } catch (error) {
    // Handle errors and send an error response
    console.error(`Error creating category: ${error}`);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default createNewCategory;
