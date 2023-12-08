
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true
    }
},{
    timestamps:true
})


const BlogCatProduct = mongoose.model("BlogCatProduct",productSchema);

export default BlogCatProduct;