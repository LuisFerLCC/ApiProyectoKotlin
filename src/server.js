import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, sequelize } from './config/database.js';
import './models/userModel.js';
import './models/postModel.js';

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); //  { force: true } 
  app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
};

start();
