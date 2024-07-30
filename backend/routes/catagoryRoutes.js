import express from "express";
import { createCatagory } from "../controllers/catagoryController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createCatagory);

export default router;
