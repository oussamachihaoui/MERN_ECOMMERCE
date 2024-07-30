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

//delete a catagory

export { createCatagory };
