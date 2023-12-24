import productCatModel from "../../models/productCat.model.js";
import Response from "../../../Handler/Response.js";

// Creating Product Category
const createCatProduct = async (req, res) => {
  try {
    if (!req.body) {
      console.error("Product category not filled properly...");
      return new Response(false, 500, "Product category not filled properly...").send(res);
    }

    const isProductCat = await productCatModel.create(req.body);
    if (!isProductCat) {
      console.error("Product category not created");
      return new Response(false, 500, "Product category not created").send(res);
    }

    return new Response(true, 201, isProductCat).send(res);
  } catch (error) {
    throw new Error("Error creating product category", error);
  }
};

// Updating Product Category
const update_productCat = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      console.error("Product category id not provided");
      return new Response(false, 500, "Product category id not provided").send(res);
    }

    const isProductCat = await productCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!isProductCat) {
      console.error("Product category not updated");
      return new Response(false, 500, "Product category not updated").send(res);
    }

    return new Response(true, 200, isProductCat).send(res);
  } catch (error) {
    throw new Error("Error updating product category", error);
  }
};

// Deleting Product Category
const deleteProductCat = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      console.error("Product category id not provided");
      return new Response(false, 500, "Product category id not provided").send(res);
    }

    const isProductCat = await productCatModel.findByIdAndDelete(id);
    if (!isProductCat) {
      console.error("Product category not deleted");
      return new Response(false, 404, "Product category not deleted").send(res);
    }

    return new Response(true, 200, isProductCat).send(res);
  } catch (error) {
    throw new Error("Error deleting product category", error);
  }
};

// Get All Product Categories
const getAll_productCat = async (req, res) => {
  try {
    const isProductCat = await productCatModel.find();
    if (!isProductCat || isProductCat.length === 0) {
      console.error("No product categories found");
      return new Response(false, 404, "No product categories found").send(res);
    }

    return new Response(true, 200, isProductCat).send(res);
  } catch (error) {
    throw new Error("Error retrieving product categories", error);
  }
};

// Get a Single Product Category
const get_productCat = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      console.error("Product category id not provided");
      return new Response(false, 500, "Product category id not provided").send(res);
    }

    const isProductCat = await productCatModel.findById(id);
    if (!isProductCat) {
      console.error("Product category not found");
      return new Response(false, 404, "Product category not found").send(res);
    }

    return new Response(true, 200, isProductCat).send(res);
  } catch (error) {
    throw new Error("Error retrieving product category", error);
  }
};

export {
  createCatProduct,
  update_productCat,
  deleteProductCat,
  getAll_productCat,
  get_productCat
};
