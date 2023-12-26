import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import Coupon from "../../models/coupon.model.js";

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req?.body);
    if (!coupon) {
      new Response(false, 500, "coupon not created").send(res);
    }

    new Response(true, 201, coupon).send(res);
  } catch (error) {
    throw new Error(error);
  }
};
// update Copun

const updateCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req?.params) {
      new Response(false, 500, "Invaid id ").send(res);
    }
    const coupon = await Coupon.findByIdAndUpdate(id, req?.body, { new: true });
    if (!coupon) {
      new Response(false, 500, "Invaid copon ").send(res);
    }

    return new Response(true, 201, coupon).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return new Response(false, 500, "Not a valid id");
  }
  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    new Response(true, 201, coupon).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const getCoupon = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return new Response(false, 500, "Not a valid id");
  }
  try {
    const coupon = await Coupon.findById(id);
    new Response(true, 201, coupon).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.find();
        new Response(true, 201, coupon).send(res);
    } catch (error) {
      throw new Error(error);
    }
  };

export { createCoupon,deleteCoupon,updateCoupon,getAllCoupons,getCoupon };
