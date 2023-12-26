import { isValidObjectId } from "mongoose";
import Response from "../../../Handler/Response.js";
import Enquiry from "../../models/enquiry.model.js";

const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req?.body);
    if (!enquiry) {
      new Response(false, 500, "Color not created").send(res);
    }

   return new Response(true, 201, enquiry).send(res);
  } catch (error) {
    throw new Error(error);
  }
};
// update Copun

const updateEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req?.params) {
      new Response(false, 500, "Invaid id ").send(res);
    }
    const enquiry = await Enquiry.findByIdAndUpdate(id, req?.body, { new: true });
    if (!enquiry) {
      new Response(false, 500, "Invaid copon ").send(res);
    }

    return new Response(true, 201, enquiry).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteEnquiry = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return new Response(false, 500, "Not a valid id");
  }
  try {
    const enquiry = await Enquiry.findByIdAndDelete(id);
    new Response(true, 201, enquiry).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const getEnquiry = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return new Response(false, 500, "Not a valid id");
  }
  try {
    const enquiry = await Enquiry.findById(id);
    new Response(true, 201, enquiry).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.find();
    new Response(true, 201, enquiry).send(res);
  } catch (error) {
    throw new Error(error);
  }
};

export { createEnquiry, deleteEnquiry, updateEnquiry, getAllEnquiry, getEnquiry };
