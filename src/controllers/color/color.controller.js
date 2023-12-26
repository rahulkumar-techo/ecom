import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import Color from "../../models/color.model.js";

const createColor = async (req, res) => {
  try {
    const color = await Color.create(req?.body);
    if (!color) {
      new Response(false, 500, "Color not created").send(res);
    }

   return new Response(true, 201, color).send(res);
  } catch (error) {
    throw new Error(error);
  }
};
// update Copun

const updateColor = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req?.params) {
      new Response(false, 500, "Invaid id ").send(res);
    }
    const color = await Color.findByIdAndUpdate(id, req?.body, { new: true });
    if (!color) {
      new Response(false, 500, "Invaid copon ").send(res);
    }

    return new Response(true, 201, color).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteColor = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return new Response(false, 500, "Not a valid id");
  }
  try {
    const color = await Color.findByIdAndDelete(id);
    new Response(true, 201, color).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const getColor = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return new Response(false, 500, "Not a valid id");
  }
  try {
    const color = await Color.findById(id);
    new Response(true, 201, color).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllColor = async (req, res) => {
  try {
    const color = await Color.find();
    new Response(true, 201, color).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export { createColor, deleteColor, updateColor, getAllColor, getColor };
