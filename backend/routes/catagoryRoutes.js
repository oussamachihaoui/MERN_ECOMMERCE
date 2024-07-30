import express from "express";
import {
  createCatagory,
  updateCatagory,
  deleteCatagory,
} from "../controllers/catagoryController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createCatagory);
router.put("/:catagoryId", authenticate, authorizeAdmin, updateCatagory);
router.delete("/:id", authenticate, authorizeAdmin, deleteCatagory);

export default router;
