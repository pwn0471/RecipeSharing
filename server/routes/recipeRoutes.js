import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUser,
  getRecipesByLoggedInUser, // ✅ NEW
  likeRecipe,
  toggleFavoriteRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
"../controllers/recipeController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/user/me", protect, getRecipesByLoggedInUser);
/* =======================
   RECIPE ROUTES
======================= */

// ➕ Add recipe (PROTECTED)
router.post("/", protect, addRecipe);

// 📄 Get all recipes (PUBLIC)
router.get("/", getAllRecipes);

// 📄 Get recipes by user (PUBLIC)
router.get("/user/:userId", getRecipesByUser);

// 📄 Get recipe by id (PUBLIC)
router.get("/:id", getRecipeById);

// ❤️ Like / Unlike recipe (PROTECTED)
router.put("/like/:id", protect, likeRecipe);

// ⭐ Favorite / Unfavorite recipe (PROTECTED)
router.put("/favorite/:id", protect, toggleFavoriteRecipe);

router.delete("/:id", protect, deleteRecipe);

export default router;
