import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

import {
  addWishlist,
  deleteAwishList,
  getAllWishLists,
} from "../controllers/wishlistController.js";
import checkId from "../middleware/checkId.js";

const router = express.Router();

router.post("/:id", authenticate, checkId, addWishlist);
router.get("/", authenticate, getAllWishLists);
router.delete("/:id", authenticate, checkId, deleteAwishList);

export default router;
