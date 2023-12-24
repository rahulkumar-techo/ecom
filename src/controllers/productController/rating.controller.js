import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import Product from "../../models/product.model.js";

export default async (req, res) => {
  const { _id } = req.user;
  const { star, prodctId, comment } = req.body;

  try {
    // Check if the user ID is valid
    if (!isValidObjectId(_id)) {
      return new Response(false, 400, "Invalid user ID");
    }

    // Find the product by ID
    const product = await Product.findById(prodctId);

    // Check if the user has already rated the product
    let isAlreadyRated = product.rating.find((userId) => {
      return userId.postedBy.toString() === _id.toString();
    });

    if (isAlreadyRated) {
      // If already rated, update the rating and comment
      await Product.updateOne(
        {
          rating: { $elemMatch: isAlreadyRated },
        },
        {
          $set: { "rating.$.star": star, "rating.$.comment": comment },
        }
      );
    } else {
      // If not rated, add a new rating
      await Product.findByIdAndUpdate(
        prodctId,
        {
          $push: { rating: { star: star, comment: comment, postedBy: _id } },
        }
      );
    }

    // Get all ratings for the product
    const getAllRating = await Product.findById(prodctId);

    // Calculate the total rating and update the product
    let totalRating = getAllRating.rating.length;
    let ratingSum = getAllRating.rating
      .map((item) => item.star)
      .reduce((prev, cur) => prev + cur, 0);
    let actualRating = Math.round(ratingSum / totalRating);

    // Update the product with the calculated total rating
    let finalProduct = await Product.findByIdAndUpdate(
      prodctId,
      {
        totalRating: actualRating,
      },
      {
        new: true,
      }
    );

    // Send a success response
    return new Response(true, 201, finalProduct).send(res);
  } catch (error) {
    // If there's an error, throw it and handle it elsewhere
    throw new Error(error);
  }
};
