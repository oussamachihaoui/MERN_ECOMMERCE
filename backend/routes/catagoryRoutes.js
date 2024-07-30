import express from "express";
import {
  createCatagory,
  updateCatagory,
} from "../controllers/catagoryController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createCatagory);
router.put("/:catagoryId", authenticate, authorizeAdmin, updateCatagory);

export default router;
