import express from "express";
import { Router } from "express";
import {
  addProductsToCart,
  getAllProductsInCart,
  deleteProductFromCart,
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", authenticate, addProductsToCart);
router.get("/", authenticate, getAllProductsInCart);
router.delete("/:id", authenticate, deleteProductFromCart);

export default router;
