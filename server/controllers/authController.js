import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

/* ======================
   REGISTER
====================== */
/* ======================
   REGISTER
====================== */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      favorites: [] // ensure favorites exists
    });

    /* ======================================
       TRY TO SEND EMAIL (DOES NOT BLOCK USER)
    ====================================== */
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to RecipeHub 🎉",
        html: `
          <h2>Hello ${name},</h2>
          <p>Your registration at <b>RecipeHub</b> is successful! 🎉</p>
          <p>Start sharing your delicious recipes 🍽️</p>
          <br />
          <strong>RecipeHub Team</strong>
        `,
      });

      console.log("✅ Welcome email sent");
    } catch (emailError) {
      console.log("⚠️ Email sending failed but user registered:", emailError.message);
    }

    // ALWAYS return success
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        favorites: newUser.favorites
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};


/* ======================
   LOGIN
====================== */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Send token + full user info (IMPORTANT)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites || []
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================
   PROFILE (PROTECTED)
====================== */
export const getProfile = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    favorites: req.user.favorites || []
  });
};

/* ======================
   FAVORITE / UNFAVORITE
====================== */
export const toggleFavorite = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const user = req.user;

    if (!user.favorites) {
      user.favorites = [];
    }

    const index = user.favorites.indexOf(recipeId);

    if (index === -1) {
      user.favorites.push(recipeId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    res.status(200).json({
      message: "Favorite updated",
      favorites: user.favorites
    });
  } catch (error) {
    console.error("Favorite error:", error);
    res.status(500).json({ message: "Failed to update favorite" });
  }
};
