import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ======================
   CORS CONFIG (FINAL)
====================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",                 // local frontend
      process.env.CLIENT_URL,                  // vercel frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// body parser
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.send("Recipe Sharing API is running 🚀");
});

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

