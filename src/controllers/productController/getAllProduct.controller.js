
import ErrorHandler from "../../../Handler/ErrorHandler.js"
import Product from "../../models/product.model.js";
import Response from "../../../Handler/Response.js";


const getAllProduct = async (req, res) => {
  try {
    // Validate page and limit are positive integers
    const validatedPage = parseInt(req.query.page, 10) || 1;
    const validatedLimit = parseInt(req.query.limit, 10) || 10;

    // Extract query parameters
    const { sort, fields, ...filters } = req.query;

    // Exclude special parameters from filtering
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete filters[el]);

    // Convert comparison operators in filters
    const queryStr = JSON.stringify(filters).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const filter = JSON.parse(queryStr);

    // Create Mongoose query with filters
    let query = Product.find(filter);

    // Sorting
    if (sort) {
      const sortFields = sort.split(',').join(' ');
      query = query.sort(sortFields);
    }

    // Fields selection (Projection)
    if (fields) {
      const selectFields = fields.split(',').join(' ');
      query = query.select(selectFields);
    }

    // Pagination
    const skip = (validatedPage - 1) * validatedLimit;
    query = query.skip(skip).limit(validatedLimit);

    // Execute the query
    const products = await query;

    // Check if no products found
    if (products.length === 0) {
      throw new ErrorHandler(404, 'No products found');
    }

    // Send the response
    new Response(true, 200, products).send(res);

  } catch (error) {
    console.error("Error retrieving products:", error);
    if (error instanceof ErrorHandler) {
      return new Response(true, error.status, error.message).send(res);
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAllProduct;
