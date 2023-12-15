import Product from "../../models/product.model.js";
import Response from "../../../Handler/Response.js";
const getProduct = async (req, res) => {
  const { id } = req.params;


  try {
    if (!id) {
      return new Response(false, 500, "Product id not found").send(res);
    }
    const product =  await Product.findById(id);
    

    if (!product) {
      return new Response(false, 500, "Product not Found").send(res);
    }

    new Response(true,200,product).send(res);

  } catch (error) {
    throw new Error("Error : product \n",error)
  }
};
export default getProduct;
