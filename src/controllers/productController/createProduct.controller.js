import mongoose from "mongoose";
import Product from "../../models/product.model.js";
import Response from "../../../Handler/Response.js";
import slugify from "slugify";

const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, category } = req.body;

    // Validation
    if (!title || !description || !price || !quantity || !category) {
      return new Response(false, 400, "Invalid Product Input").send(res);
    }

    // Generate slug
    const slug = slugify(title, { lower: true });

    // Check if the product already exists
    const isProductExist = await Product.findOne({
      title,
    });

    // If product already exists
    if (isProductExist) {
      return new Response(false, 400, "Product already exists").send(res);
    }

    // Create the product
    const product = await Product.create({ ...req.body, slug });

    if (!product) {
      return new Response(false, 400, "Failed to save product").send(res);
    }

    // Return success response with more details
    return new Response(true, 201, product).send(res);

  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export default createProduct;
