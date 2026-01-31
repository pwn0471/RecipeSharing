import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  toggleFavorite,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ REGISTER
router.post("/register", registerUser);

// ✅ LOGIN
router.post("/login", loginUser);

// ✅ PROFILE (protected)
router.get("/profile", protect, getProfile);

// ✅ FAVORITE / UNFAVORITE (protected)
// 👉 THIS MUST MATCH FRONTEND (PUT)
router.put("/favorite/:id", protect, toggleFavorite);

export default router;
