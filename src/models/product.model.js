import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    brand: {
      type: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
    },
    color: {
      type: String,
    },
    rating: [
      {
        star: {
          type: Number,

          min: 1,
          max: 5,
          default: 0,
        },
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId, // Correct the reference to Schema.Types.ObjectId
          ref: "User",
        },
      },
    ],
    totalRating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
