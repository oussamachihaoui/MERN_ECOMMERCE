import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
  getAllusers,
  updateUserCredentials,
  deleteUserById,
  getUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//user routes
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.put("/", authenticate, updateUserCredentials);

// admin routes
router.get("/", authenticate, authorizeAdmin, getAllusers);
router.delete("/:id", authenticate, authorizeAdmin, deleteUserById);
router.get("/:id", authenticate, authorizeAdmin, getUserById);

export default router;
