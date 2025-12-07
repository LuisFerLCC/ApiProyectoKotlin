import express from "express";
import {
	getPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
	likePost,
	removeLike,
	createComment,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, createComment);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.delete("/:id/like", protect, removeLike);

export default router;
