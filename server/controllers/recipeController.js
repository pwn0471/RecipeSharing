import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

/* ======================
   ➕ ADD RECIPE
====================== */
export const addRecipe = async (req, res) => {
  try {
    const { title, instruction, ingredients, imageUrl } = req.body;

    // ✅ VALIDATION (THIS FIXES 400 ERROR)
    if (
      !title ||
      !instruction ||
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        message: "Title, instruction and ingredients are required",
      });
    }

    const recipe = await Recipe.create({
      title,
      instruction,
      ingredients,
      imageUrl,
      createdBy: req.user._id, // comes from JWT
    });

    res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    console.error("ADD RECIPE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   📄 GET ALL RECIPES
====================== */
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   📄 GET RECIPE BY ID
====================== */
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   👤 GET RECIPES BY USER
====================== */
export const getRecipesByUser = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      createdBy: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   ❤️ LIKE / UNLIKE RECIPE
====================== */
export const likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const userId = req.user._id.toString();

    // likes must be an ARRAY in schema
    const index = recipe.likes.indexOf(userId);

    if (index > -1) {
      recipe.likes.splice(index, 1);
    } else {
      recipe.likes.push(userId);
    }

    await recipe.save();

    res.json({
      likes: recipe.likes.length,
      liked: index === -1,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getRecipesByLoggedInUser = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ======================
   ⭐ FAVORITE / UNFAVORITE
====================== */
export const toggleFavoriteRecipe = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const recipeId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.favorites.indexOf(recipeId);

    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(recipeId);
    }

    await user.save();

    res.json({
      favorite: index === -1,
      totalFavorites: user.favorites.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ❌ DELETE RECIPE */
/* DELETE RECIPE (OWNER ONLY) */
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // 🔐 only owner can delete
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


