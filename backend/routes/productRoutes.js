import express, { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSpecificProduct,
  addReview,
  getAllReviews,
} from "../controllers/productController.js";

const router = express.Router();

// CRUD PRODUCT
router.post("/", authenticate, authorizeAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSpecificProduct);
router.put("/:id", authenticate, authorizeAdmin, updateProduct);
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

// CRUD REVIEW
router.post("/:id/reviews", authenticate, addReview);
router.get("/:id/reviews", getAllReviews);

export default router;
