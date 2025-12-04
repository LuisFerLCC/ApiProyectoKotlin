import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './userModel.js';

export const Post = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  caption: { type: DataTypes.TEXT, allowNull: true },
  imageUrl: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });
