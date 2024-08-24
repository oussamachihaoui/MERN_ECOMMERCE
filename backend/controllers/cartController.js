import expressAsyncHandler from "express-async-handler";
import Cart from "../Models/cartModel.js";
import { Product } from "../Models/productModel.js";

const addProductsToCart = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        message: "product is not found",
      });
      return;
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        products: [],
      });
    }

    await cart.products.addToSet(product._id);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

const getAllProductsInCart = expressAsyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products",
      "-reviews -numReviews "
    );

    res.json(cart.products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

const deleteProductFromCart = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!product) {
      res.status(404).json({
        message: "Product is not found",
      });
    }

    if (!cart) {
      res.status(500).json({
        message: "your cart is empty , add products",
      });
    }

    await cart.products.pull(id);
    await cart.save();
    res.json(cart.products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export { addProductsToCart, getAllProductsInCart, deleteProductFromCart };
