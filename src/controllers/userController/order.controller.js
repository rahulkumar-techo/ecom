import { isValidObjectId } from "mongoose";
import uniqid from "uniqid"; // Make sure to import the required dependency.
import Response from "../../../Handler/Response.js";
import User from "../../models/user.model.js";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import Order from "../../models/order.model.js"; // Make sure to import your Order model.

const createOrder = async (req, res) => {
  try {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return new Response(false, 500, "Object id not valid").send(res);
    }

    if (!COD) {
      throw new Error("Create cash order failed");
    }

    const user = await User.findById(_id);
    const userCart = await Cart.findOne({orderby:user?._id});

    if (!userCart || !user) {
        console.log(userCart)
      throw new Error("Cart not found");
    }

    let finalAmount = couponApplied && userCart.totalAfterDiscount
      ? userCart.totalAfterDiscount
      : userCart.cartTotal;

    const newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    const update = userCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }));

    await Product.bulkWrite(update, {});

    return new Response(true, 201, {msg:"Success"}).send(res);
  } catch (error) {
    console.error(error); // Log the error for debugging.
    return new Response(false, 500, error.message).send(res);
  }
};

const getOrders = async (req, res) => {
    try {
      const { _id } = req.user;
  
      // Check if the _id is a special value (e.g., "get-order")
      if (_id === "get-order") {
        return new Response(false, 400, "Invalid user ID").send(res);
      }
  
      if (!isValidObjectId(_id)) {
        return new Response(false, 500, "Not a valid Id").send(res);
      }
  
      const userOrders = await Order.findOne({ orderby: _id })
        .populate("products.product")
        .populate("orderby")
        .exec();
  
      return new Response(true, 201, userOrders).send(res);
    } catch (error) {
      console.error(error);
      return new Response(false, 500, error.message).send(res);
    }
  };
  

const getAllOrders = async (req, res) => {
  try {
    const allUserOrders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();

    return new Response(true, 201, allUserOrders).send(res);
  } catch (error) {
    console.error(error); // Log the error for debugging.
    return new Response(false, 500, error.message).send(res);
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new Response(false, 500, "Not a valid Id").send(res);
    }

    const userOrders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();

    return new Response(true, 201, userOrders).send(res);
  } catch (error) {
    console.error(error); // Log the error for debugging.
    return new Response(false, 500, error.message).send(res);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return new Response(false, 500, "Not a valid Id").send(res);
    }

    const updatedOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: { status: status },
      },
      { new: true }
    );

    return new Response(true, 201, updatedOrderStatus).send(res);
  } catch (error) {
    console.error(error); 
    return new Response(false, 500, error.message).send(res);
  }
};

const saveAddress = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!isValidObjectId(_id)) {
      return new Response(false, 500, "Not a valid Id").send(res);
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true }
    );

    return new Response(true, 201, updatedUser).send(res);
  } catch (error) {
    console.error(error); // Log the error for debugging.
    return new Response(false, 500, error.message).send(res);
  }
};

export {
  createOrder,
  getOrderByUserId,
  getAllOrders,
  getOrders,
  updateOrderStatus,
  saveAddress,
};
