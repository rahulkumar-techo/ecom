import Brand from "../../models/brand.model.js";
import Response from "../../../Handler/Response.js";

const createbrand = async (req, res) => {
  try {
    if (!req?.body) {
      return new Response(false, 400, "Invalid Input").send(res);
    }

    const brand = await Brand.create(req.body);

    if (!brand) {
      return new Response(false, 500, "Invalid Input").send(res);
    }

    new Response(true, 200, brand).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default createbrand;
