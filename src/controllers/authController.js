import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!(name || username || email || password)) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const existsUser = await User.findOne({ where: { username } });
    if (existsUser) return res.status(400).json({ message: 'Username ya existe' });

    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) return res.status(400).json({ message: 'Email ya registrado' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, email, password: hashed });

    res.json({
      user: { id: user.id, name: user.name, username: user.username, email: user.email, avatar: user.avatar },
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username || password)) return res.status(400).json({ message: 'Faltan credenciales' });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.json({
      user: { id: user.id, name: user.name, username: user.username, email: user.email, avatar: user.avatar },
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
