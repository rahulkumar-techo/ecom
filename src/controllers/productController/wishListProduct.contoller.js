import User from "../../models/user.model.js";
import Response from "../../../Handler/Response.js";
import { isValidObjectId } from "mongoose";

const wishList = async (req, res) => {
  // it get after login
  const { _id } = req.user;
  const { product_id } = req.body;

  try {
    if (!isValidObjectId(product_id)) {
      new Response(false, 500, "not a vaild id").res(res);
    }
    if (!_id || !product_id) {
      new Response(false, 500, "product_id or _id is not defined").res(res);
    }

    const user = await User.findById(_id);

    if (!user) {
      new Response(false, 500, "Id not matched in wishList").res(res);
    }

    // does wishlist item matching or not :
    const isitemMatched = user.wishlist.find(
      (wishlistId) => wishlistId.toString() === product_id
    );
    console.log(Boolean(isitemMatched));
    if (isitemMatched) {
      const findAndDelete = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: product_id },
        },
        { new: true }
      );

      if (!findAndDelete) {
        new Response(false, 500, "wishList data not deleted").res(res);
      }
    } else {
      const addWishlist = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: product_id },
        },
        { new: true }
      );

      if (!addWishlist) {
        new Response(false, 500, "wishList data not added").res(res);
      }
    }

    return new Response(true, 200, user).send(res);
  } catch (error) {
    throw new Error("wishlist Error ", error);
  }
};




export { wishList };
