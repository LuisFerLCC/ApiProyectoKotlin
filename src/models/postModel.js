import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./userModel.js";

export const Post = sequelize.define(
	"Post",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		caption: { type: DataTypes.TEXT, allowNull: true },
		imageUrl: { type: DataTypes.STRING, allowNull: true },
	},
	{ timestamps: true },
);

export const Like = sequelize.define("Like", {}, { timestamps: false });

User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Post, {
	through: Like,
	as: "Likes",
	foreignKey: "userId",
	onDelete: "CASCADE",
});
Post.belongsToMany(User, {
	through: Like,
	as: "Likes",
	foreignKey: "postId",
	onDelete: "CASCADE",
});
