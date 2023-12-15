import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const blogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const BCategory=mongoose.model("BCategory", blogcategorySchema);

export default BCategory;
