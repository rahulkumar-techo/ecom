import Product from "../../models/product.model.js";
import Response from "../../../Handler/Response.js";

const deleteProduct = async (req, res) => {
  try {
    // Check if req.params or req.params.id is undefined or null
    if (!req?.params?.id) {
      return new Response(false, 500, "Product id not provided").send(res);
    }

    const id = req.params.id;
   
    // Using try-catch block for asynchronous operations
    try {
      const delProduct = await Product.findByIdAndDelete(id);

      // Check if the product with the given id was not found
      if (!delProduct) {
        console.log("Product not found");
        return res
          .status(404)
          .json(new Response(false, 404, "Product not found"));
      }

      // Send success response if the product was deleted
      return new Response(true, 200, "Product deleted").send(res);
    } catch (error) {
      // Handle database-related errors
      console.error("Error deleting product:", error);
      return new Response(false, 500, "Internal server error").send(res);
    }
  } catch (error) {
    // Handle general errors
    console.error("Delete product error:", error.message);
    return new Response(false, 500, "Internal server error").send(res);
  }
};

export default deleteProduct;
