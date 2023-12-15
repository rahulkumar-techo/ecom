import BCategory from "../../models/blogCat.model.js";
import Response from "../../../Handler/Response.js";
import { isValidObjectId } from "mongoose";

const getblogCat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new Response(false, 400, " Invalid id").send(res);
    }

    if (!req?.params) {
      return new Response(false, 400, "id not defined").send(res);
    }

    const blogCat = await BCategory.findById(id);

    if (!blogCat) {
      return new Response(false, 500, "category not updated").send(res);
    }
    return new Response(false, 200, blogCat).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export default getblogCat;
