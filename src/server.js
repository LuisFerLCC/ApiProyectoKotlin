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
};

start();
