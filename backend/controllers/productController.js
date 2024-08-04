import expressAsyncHandler from "express-async-handler";
import { Product } from "../Models/productModel.js";

// create Product
const createProduct = expressAsyncHandler(async (req, res) => {
  const { productName, price, description, quantity, brand, catagory, photo } =
    req.body;

  if (
    !productName ||
    !price ||
    !description ||
    !quantity ||
    !brand ||
    !catagory
  ) {
    res.status(400).json({
      message: "please fill the inputs",
    });
    return;
  }

  const product = await Product.create({
    productName,
    description,
    quantity,
    brand,
    catagory,
    price,
    photo,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400).json({
      message: "Creation failed , please try again ..",
    });
  }
});

// get all products

// update product

// delete product

export { createProduct };
