
import Brand from "../../models/brand.model.js";
import Response from "../../../Handler/Response.js";

const getallbrand =  async(req,res)=>{
    try {

        const brand = await Brand.find();
    
        if (!brand) {
          return new Response(false, 500, "Invalid Input").send(res);
        }
    
        new Response(true, 200, brand).send(res);
      } catch (error) {
        throw new Error(error);
      }
}

export default getallbrand;