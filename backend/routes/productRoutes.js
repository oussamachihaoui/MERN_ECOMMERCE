import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";

const router = express.Router();

export default router;
