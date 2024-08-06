import expressAsyncHandler from "express-async-handler";
import { Product, Review } from "../Models/productModel.js";

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
  const products = await Product.find().populate("catagory");
  res.status(200).json(products);
});

// getSpecificProduct
const getSpecificProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(400).json({
      message: "Product is not found",
    });
  }
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
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({
      message: "Product is deleted successfully",
    });
  } else {
    res.status(400).json({
      message: "Product is not found",
    });
  }
});

// REVIEWS ON SPECIFIC PRODUCT

// create review

const addReview = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({
        message: "Product is not found",
      });
    }
    const review = await Review.create({
      comment: comment,
      rating: rating,
      createdBy: req.user._id,
    });

    product.reviews.push(review._id);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "try again ...",
    });
  }
});

// get reviews
const getAllReviews = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id).populate("reviews");
    if (!products) {
      res.status(404).json({
        message: "Product is not found",
      });
      return;
    }

    res.status(200).json(products.reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "try again" });
  }
});

// update review

//delete review

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSpecificProduct,
  addReview,
  getAllReviews,
};
