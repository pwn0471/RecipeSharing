import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (LOCAL + VERCEL)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

// body parser
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Recipe Sharing API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
