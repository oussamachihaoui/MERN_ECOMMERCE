import expressAsyncHandler from "express-async-handler";
import Catagory from "../Models/catagoryModel.js";

// create catagory
const createCatagory = expressAsyncHandler(async (req, res) => {
  const { name, photo } = req.body;
  const existsCatagory = await Catagory.findOne({ name });

  if (!name) {
    res.status(400).json({ message: "name is required" });
    return;
  }

  if (existsCatagory) {
    res.status(400).json({
      message: "Catagory already exists",
    });
    return;
  }
  const catagory = await Catagory.create({ name, photo });

  if (catagory) {
    res.status(201).json(catagory);
  } else {
    res.status(400).json({
      message: "try again...",
    });
  }
});

// get all catagories
const getAllCatagories = expressAsyncHandler(async (req, res) => {
  const catagories = await Catagory.find({});
  res.json(catagories);
});

// get a specific catagory by ID

const getSpecificCatagory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const catagory = await Catagory.findOne({ _id: id });
  if (catagory) {
    res.status(200).json(catagory);
  } else {
    res.status(400).json({
      message: "Catagory is not found",
    });
  }
});

// update a catagory
const updateCatagory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const { catagoryId } = req.params;

  const catagory = await Catagory.findOne({ _id: catagoryId });

  if (catagory) {
    const existedCatagory = await Catagory.findOne({ name });
    if (
      existedCatagory &&
      existedCatagory._id.toString() !== catagory._id.toString()
    ) {
      res.status(400).json({
        message: "Name is already taken",
      });
    }

    catagory.name = name || catagory.name;
    const updatedCatagory = await catagory.save();

    res.status(200).json(updatedCatagory);
  } else {
    res.status(404).json({
      message: "Catagory is not found",
    });
  }
});

//delete a catagory
const deleteCatagory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const catagory = await Catagory.findById(id);
  if (catagory) {
    await Catagory.deleteOne({ _id: catagory._id });
    res.status(200).json({
      message: "Deleted successfully",
    });
  } else {
    res.status(400).json({
      message: "Catagory is not found",
    });
  }
});

export {
  createCatagory,
  updateCatagory,
  deleteCatagory,
  getAllCatagories,
  getSpecificCatagory,
};
