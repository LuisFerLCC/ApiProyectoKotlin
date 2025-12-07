import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./userModel.js";
import { Post } from "./postModel.js";

export const Comment = sequelize.define(
	"Comment",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		content: { type: DataTypes.TEXT, allowNull: false },
	},
	{ timestamps: true },
);

export const CommentLike = sequelize.define(
	"CommentLike",
	{},
	{ timestamps: false },
);

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.belongsToMany(Comment, {
	through: CommentLike,
	as: "CommentLikes",
	foreignKey: "userId",
	onDelete: "CASCADE",
});
Comment.belongsToMany(User, {
	through: CommentLike,
	as: "CommentLikes",
	foreignKey: "commentId",
	onDelete: "CASCADE",
});
