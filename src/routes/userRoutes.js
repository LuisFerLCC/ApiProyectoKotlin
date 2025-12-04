import express from 'express';
import { User } from '../models/userModel.js';
import { Post } from '../models/postModel.js';
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['id','name','username','email','avatar','createdAt'] });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const posts = await Post.findAll({ where: { userId: user.id }, order: [['createdAt','DESC']] });
    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
