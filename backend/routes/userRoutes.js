import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
  getAllusers,
  updateUserCredentials,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authenticate, authorizeAdmin, getAllusers);
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.put("/", authenticate, updateUserCredentials);

export default router;
