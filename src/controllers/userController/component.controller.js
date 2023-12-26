import User from "../../models/user.model.js";
import Response from "../../../Handler/Response.js";
import { isValidObjectId } from "mongoose";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import Coupon from "../../models/coupon.model.js";

const getwishlistUser = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      console.error("User not found");
      return new Response(false, 500, "User not found").send(res);
    }

    const user = await User.findById(_id).populate("wishlist");
    return new Response(true, 200, user).send(res);
  } catch (error) {
    console.error(error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

const userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const { _id } = req.user;

    // Validate user ID
    if (!isValidObjectId(_id)) {
      console.error("User not defined");
      return new Response(false, 500, "User not defined").send(res);
    }

    let products = [];

    // Find the user based on the provided user ID
    const user = await User.findById(_id);

    // Check if the user already has a cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      await Cart.deleteOne({ _id: alreadyExistCart._id });
      console.log("alreayExist")
    } else {
      // If the user doesn't have a cart, populate the products array
      for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;

        // Fetch product price from the database
        let getPrice = await Product.findById(cart[i]._id)
          .select("price")
          .exec();

        // Check if the product is not found
        if (!getPrice) {
          console.error(`Product with ID ${cart[i]._id} not found`);
          return new Response(
            false,
            404,
            `Product with ID ${cart[i]._id} not found`
          ).send(res);
        }

        object.price = getPrice.price;
        products.push(object);
      }
    }

    // Calculate the total price of the products in the cart
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    // Create and save a new cart document
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();

    // Respond with a success message, status code 201 (Created), and the new cart
    new Response(true, 201, newCart).send(res);
  } catch (error) {
    console.error(error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

const getUserCart = async (req, res) => {
  try {
    const { _id } = req.user;

    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );

    if (!cart) {
      return new Response(false, 500, "Cart not found").send(res);
    }

    return new Response(true, 200, cart).send(res);
  } catch (error) {
    console.error(error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

const emptyCart = async (req, res) => {
  try {
    const { _id } = req.user;

    // Check if the user ID is a special value (e.g., "emptycart")
    if (_id === "emptycart") {
      // Handle the special case (e.g., perform a different action or return a specific response)
      return new Response(false, 400, "Invalid user ID").send(res);
    }

    // Validate the user ID
    if (!isValidObjectId(_id)) {
      return new Response(false, 500, "Invalid user ID").send(res);
    }

    const user = await User.findOne({ _id });
    
    // Check if the user is found
    if (!user) {
      return new Response(false, 404, "User not found").send(res);
    }

    // Find and replace the user's cart with an empty one
    const cart = await Cart.findOneAndReplace({ orderby: user._id });

    // Check if the cart was successfully removed
    if (!cart) {
      return new Response(false, 500, "Cart not removed").send(res);
    }

    // Respond with a success message, status code 201 (Created), and the removed cart
    new Response(true, 201, cart).send(res);
  } catch (error) {
    console.error(error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};


const applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return new Response(false, 500, "Id not found").send(res);
    }

    const isValidCoupon = await Coupon.findOne({ name: coupon });

    if (!isValidCoupon) {
      return new Response(false, 400, "Invalid Coupon").send(res);
    }

    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({ orderby: user._id }).populate(
      "products.product"
    );

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * isValidCoupon.discount) / 100
    ).toFixed(2);

    const cartdetails = await Cart.findOneAndUpdate(
      { orderby: user._id },
      { totalAfterDiscount },
      { new: true }
    );

    new Response(true, 201, { totalAfterDiscount, cartdetails }).send(res);
  } catch (error) {
    console.error(error);
    return new Response(false, 500, "Internal Server Error").send(res);
  }
};

export { getwishlistUser, applyCoupon, emptyCart, getUserCart, userCart };
