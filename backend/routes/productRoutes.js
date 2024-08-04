import express, { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createProduct);

export default router;
