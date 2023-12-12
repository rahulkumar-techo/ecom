import slugify from "slugify";
import Response from "../../../Handler/Response.js";
import Product from "../../models/product.model.js";

const updateProduct = async (req, res) => {
  try {
    // Check if req.params.id is not provided
    if (!req?.params?.id) {
      return new Response(false, 404, "Product id not found for update").send(res);
    }

    const {title } = req.body;

    // Check if title and price are provided in the request body
    if (!title ) {
      return new Response(false, 400, "Invalid inputs. Both title and price are required.").send(res);
    }

    const slug = slugify(title);
    const { id } = req.params;

    // Use try-catch block for asynchronous operations
    try {
      const update_product = await Product.findByIdAndUpdate(
        id,
      {...req.body,slug},
        { new: true }
      );

      // Check if the product with the given id was not found
      if (!update_product) {
        return new Response(false, 404, "Product not found or not updated").send(res);
      }

      // Send success response with the updated product
      return new Response(true, 200, update_product ).send(res);
    } catch (error) {
      // Handle database-related errors
      console.error("Error updating product:", error);
      return new Response(false, 500, "Internal server error").send(res);
    }
  } catch (error) {
    // Handle general errors
    console.error("Update product error:", error.message);
    return new Response(false, 500, "Internal server error").send(res);
  }
};

export default updateProduct;
