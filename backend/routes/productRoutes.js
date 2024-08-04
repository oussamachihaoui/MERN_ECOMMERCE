import express, { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createProduct);
router.get("/", authenticate, getAllProducts);
router.put("/:id", authenticate, authorizeAdmin, updateProduct);

export default router;
