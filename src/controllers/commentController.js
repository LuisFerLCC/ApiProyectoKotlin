import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";

export const likeComment = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const comment = await Comment.findByPk(id);
		if (!comment)
			return res
				.status(404)
				.json({ message: "Comentario no encontrado" });

		const user = await User.findByPk(userId);
		await comment.addCommentLike(user);
		res.json({ message: "Like añadido" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateComment = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const comment = await Comment.findByPk(id);
		if (!comment)
			return res
				.status(404)
				.json({ message: "Comentario no encontrado" });
		if (comment.userId !== userId)
			return res
				.status(403)
				.json({ message: "No autorizado para editar este comentario" });

		comment.content = req.body.content;
		await comment.save();
		res.json(comment);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteComment = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const comment = await Comment.findByPk(id);
		if (!comment)
			return res
				.status(404)
				.json({ message: "Comentario no encontrado" });
		if (comment.userId !== userId)
			return res.status(403).json({
				message: "No autorizado para eliminar este comentario",
			});

		await comment.destroy();
		res.json({ message: "Comentario eliminado" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const removeCommentLike = async (req, res) => {
	try {
		const id = req.params.id;
		const userId = req.user?.id;
		const comment = await Comment.findByPk(id);
		if (!comment)
			return res
				.status(404)
				.json({ message: "Comentario no encontrado" });

		const user = await User.findByPk(userId);
		await comment.removeCommentLike(user);
		res.json({ message: "Like eliminado" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
