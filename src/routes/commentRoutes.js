import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	deleteComment,
	likeComment,
	updateComment,
	removeCommentLike,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id/like", protect, likeComment);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);
router.delete("/:id/like", protect, removeCommentLike);

export default router;
