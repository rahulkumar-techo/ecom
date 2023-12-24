import mongoose from "mongoose"

const productCat_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

},{timestamps:true,timeseries:true})

export default  mongoose.model("ProductCat",productCat_schema);