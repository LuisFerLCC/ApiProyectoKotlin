import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";

import app from "./app.js";
import { connectDB, sequelize } from "./config/database.js";
import "./models/userModel.js";
import "./models/postModel.js";
import { User } from "./models/userModel.js";
import { Like, Post } from "./models/postModel.js";
import { Comment, CommentLike } from "./models/commentModel.js";

const PORT = process.env.PORT || 4000;

const start = async () => {
	await connectDB();
	await sequelize.sync({ alter: true }); //  { force: true }
	app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));

	if ((await User.findAndCountAll()).count < 3) {
		await User.create({
			name: "Usuario de prueba 1",
			username: "usuario1",
			email: "usuario1@correo.com",
			password: await bcrypt.hash("usuario1", 10),
			avatar: "https://avatars.githubusercontent.com/u/81205298?s=400&v=4",
		});
		await User.create({
			name: "Usuario de prueba 2",
			username: "usuario2",
			email: "usuario2@correo.com",
			password: await bcrypt.hash("usuario2", 10),
		});
		await User.create({
			name: "Usuario de prueba 3",
			username: "usuario3",
			email: "usuario3@correo.com",
			password: await bcrypt.hash("usuario3", 10),
			avatar: "https://avatars.githubusercontent.com/u/151427821?v=4",
		});
	}

	if ((await Post.findAndCountAll()).count < 6) {
		await Post.create({
			userId: 1,
			caption: "Post de prueba 1",
			imageUrl:
				"https://fastly.picsum.photos/id/387/1080/1080.jpg?hmac=xQSmztGBoAKkRCMdjTb6TvXVEYoX2Q4-rm_sBChGGv8",
		});
		await Post.create({
			userId: 1,
			caption: "Post de prueba 2",
			imageUrl:
				"https://fastly.picsum.photos/id/507/1080/1080.jpg?hmac=k0iGOAu9Ri0Di8w8MVK7Qfc91Ao3PniSmL9JQMQJ3lA",
		});
		await Post.create({
			userId: 2,
			caption: "Post de prueba 3",
			imageUrl:
				"https://fastly.picsum.photos/id/400/1080/1080.jpg?hmac=7NGBLz5lT5JvEs8IggASVhP9ZM0Gayqib-w7NDItWKI",
		});
		await Post.create({
			userId: 2,
			caption: "Post de prueba 4",
			imageUrl:
				"https://fastly.picsum.photos/id/309/1080/1080.jpg?hmac=q1AkLJNgo0YpFpAg88bTZ8SQEr2TvcptL7vPPBue7fk",
		});
		await Post.create({
			userId: 3,
			caption: "Post de prueba 5",
			imageUrl:
				"https://fastly.picsum.photos/id/905/1080/1080.jpg?hmac=53niMMkH5TMb5XTVIc_5SGrnc87ongRcbahsnTvxqsU",
		});
		await Post.create({
			userId: 3,
			caption: "Post de prueba 6",
			imageUrl:
				"https://fastly.picsum.photos/id/971/1080/1080.jpg?hmac=YyD7Psjbul3TH0fQigWHJZ-WBSwBiK_Y-MtyNSp9BeQ",
		});
	}

	if ((await Like.findAndCountAll()).count < 5) {
		await Like.create({
			userId: 1,
			postId: 3,
		});
		await Like.create({
			userId: 1,
			postId: 5,
		});
		await Like.create({
			userId: 2,
			postId: 2,
		});
		await Like.create({
			userId: 2,
			postId: 5,
		});
		await Like.create({
			userId: 3,
			postId: 2,
		});
	}

	if ((await Comment.findAndCountAll()).count < 3) {
		await Comment.create({
			userId: 1,
			postId: 5,
			content: "Wow, de película!",
		});
		await Comment.create({
			userId: 2,
			postId: 2,
			content: "¡Excelente!",
		});
		await Comment.create({
			userId: 3,
			postId: 2,
			content: "Dónde es?",
		});
	}

	if ((await CommentLike.findAndCountAll()).count < 4) {
		await CommentLike.create({
			userId: 3,
			commentId: 1,
		});
		await CommentLike.create({
			userId: 2,
			commentId: 1,
		});
		await CommentLike.create({
			userId: 1,
			commentId: 2,
		});
		await CommentLike.create({
			userId: 2,
			commentId: 3,
		});
	}
};

start();
