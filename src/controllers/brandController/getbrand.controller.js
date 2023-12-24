import Brand from "../../models/brand.model.js";
import Response from "../../../Handler/Response.js";

const getbrand = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return new Response(false, 400, "Invalid Input").send(res);
    }
    const { id } = req.params;
    const brand = await Brand.findById(id);

    if (!brand) {
      return new Response(false, 500, "Invalid Input").send(res);
    }

    new Response(true, 200, brand).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default getbrand;
