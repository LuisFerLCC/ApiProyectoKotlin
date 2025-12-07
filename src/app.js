import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => res.json({ message: "API instaclone up" }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// middleware para manejar rutas no encontradas
app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

// middleware general de errores
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ message: "Error del servidor" });
});

export default app;
