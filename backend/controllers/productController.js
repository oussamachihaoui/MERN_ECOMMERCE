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
const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// update product
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { productName, price, description, quantity, brand, catagory, photo } =
    req.body;
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    product.productName = productName || product.productName;
    product.brand = brand || product.brand;
    product.catagory = catagory || product.catagory;
    product.description = description || product.description;
    product.photo = photo || product.photo;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(400).json({
      message: "Product is not found",
    });
  }
});
// delete product

export { createProduct, getAllProducts, updateProduct };
