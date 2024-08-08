import expressAsyncHandler from "express-async-handler";
import { Product } from "../Models/productModel.js";

const addWishlist = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        message: "Product is not found",
      });
      return;
    }

    req.user.wishlist.addToSet(product._id);
    await req.user.save();

    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Try again..",
    });
  }
});

const getAllWishLists = expressAsyncHandler(async (req, res) => {
  await req.user.populate("wishlist");
  res.json(req.user);
});

const deleteAwishList = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({
        message: "Product is not found",
      });
      return;
    }
    await req.user.wishlist.pull(id);
    await req.user.save();

    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Try again..",
    });
  }
});

export { addWishlist, getAllWishLists, deleteAwishList };
