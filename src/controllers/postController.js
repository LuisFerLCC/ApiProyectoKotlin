import { Like, Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import { Comment, CommentLike } from "../models/commentModel.js";

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: [
				{ model: User, attributes: ["id", "username", "avatar"] },
				{
					model: User,
					through: Like,
					as: "Likes",
					attributes: ["id", "username", "avatar"],
				},
			],
			order: [["createdAt", "DESC"]],
		});
		res.json({ data: posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getPostById = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await Post.findByPk(id, {
			include: [
				{ model: User, attributes: ["id", "username", "avatar"] },
				{
					model: User,
					through: Like,
					as: "Likes",
					attributes: ["id", "username", "avatar"],
				},
				{
					model: Comment,
					attributes: ["id", "content"],
					include: [
						{
							model: User,
							attributes: ["id", "username", "avatar"],
						},
						{
							model: User,
							through: CommentLike,
							as: "CommentLikes",
							attributes: ["id", "username", "avatar"],
						},
					],
				},
			],
		});
		if (!post)
			return res.status(404).json({ message: "Post no encontrado" });
		res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	try {
		const { caption, imageUrl } = req.body;
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ message: "No autorizado" });

		const post = await Post.create({
			caption: caption || "",
			imageUrl: imageUrl || "",
			userId,
		});
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createComment = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const post = await Post.findByPk(id);
		if (!post)
			return res.status(404).json({ message: "Post no encontrado" });

		const { content } = req.body;
		const comment = await Comment.create({
			userId,
			postId: id,
			content,
		});
		res.json({ data: comment });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const likePost = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const post = await Post.findByPk(id);
		if (!post)
			return res.status(404).json({ message: "Post no encontrado" });

		const user = await User.findByPk(userId);
		await post.addLike(user);
		res.json({ message: "Like añadido" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const post = await Post.findByPk(id);
		if (!post)
			return res.status(404).json({ message: "Post no encontrado" });
		if (post.userId !== userId)
			return res
				.status(403)
				.json({ message: "No autorizado para editar este post" });

		const { caption, imageUrl } = req.body;
		post.caption = caption ?? post.caption;
		post.imageUrl = imageUrl ?? post.imageUrl;
		await post.save();
		res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const post = await Post.findByPk(id);
		if (!post)
			return res.status(404).json({ message: "Post no encontrado" });
		if (post.userId !== userId)
			return res
				.status(403)
				.json({ message: "No autorizado para eliminar este post" });

		await post.destroy();
		res.json({ message: "Post eliminado" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const removeLike = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const post = await Post.findByPk(id);
		if (!post)
			return res.status(404).json({ message: "Post no encontrado" });

		const user = await User.findByPk(userId);
		await post.removeLike(user);
		res.json({ message: "Like eliminado" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
