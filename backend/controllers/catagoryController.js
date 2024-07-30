import expressAsyncHandler from "express-async-handler";
import Catagory from "../Models/catagoryModel.js";

// create catagory
const createCatagory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
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
  const catagory = await Catagory.create({ name });

  if (catagory) {
    res.status(201).json(catagory);
  } else {
    res.status(400).json({
      message: "try again...",
    });
  }
});

// get a catagory

// update a catagory
const updateCatagory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const catagory = await Catagory.findOne(id);

  if (catagory) {
    const existedCatagory = await Catagory.findOne({ name });
    if (
      existedCatagory &&
      existedCatagory._id.toString() !== catagory._id.toString()
    ) {
      res.status(400).json({
        message: "Name is already taken",
      });
      return;
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

export { createCatagory, updateCatagory };
