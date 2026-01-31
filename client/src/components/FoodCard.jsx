import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

const FoodCard = ({ recipe }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // MongoDB recipe check
  const isDBRecipe = !!recipe._id;

  const [liked, setLiked] = useState(false);

  // 🔁 Check if recipe is already in favorites (ONLY for DB recipes)
  useEffect(() => {
    const checkLiked = async () => {
      if (!token || !isDBRecipe) return;

      try {
        const res = await API.get("/auth/profile");
        const favorites = res.data.favorites || [];
        setLiked(favorites.includes(recipe._id));
      } catch (err) {
        console.error(err);
      }
    };

    checkLiked();
  }, [recipe._id, token, isDBRecipe]);

  // ⭐ CARD CLICK → open recipe page
  const handleCardClick = () => {
    if (!token) {
      toast.error("Please login first 🔒");
      setTimeout(() => navigate("/login"), 800);
      return;
    }

    // MongoDB recipe
    if (isDBRecipe) {
      navigate(`/recipe/${recipe._id}`);
      return;
    }

    // Spoonacular recipe
    if (recipe.id) {
      navigate(`/recipe/${recipe.id}`);
      return;
    }

    toast.error("Invalid recipe");
  };

  // ❤️ LIKE / UNLIKE → ONLY MongoDB recipes
  const handleLike = async (e) => {
    e.stopPropagation();

    if (!token) {
      toast.error("Please login first 🔒");
      setTimeout(() => navigate("/login"), 800);
      return;
    }

    if (!isDBRecipe) {
      toast.error("Only your added recipes can be favorited ❤️");
      return;
    }

    try {
      await API.put(`/recipes/favorite/${recipe._id}`);
      setLiked((prev) => !prev);

      toast.success(
        liked ? "Removed from favorites ❌" : "Added to favorites ❤️"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update favorite");
    }
  };

  const imageUrl =
    recipe.imageUrl ||
    recipe.image ||
    "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div
      onClick={handleCardClick}
      className="relative cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
    >
      {/* ❤️ LIKE BUTTON */}
      {/* <button
        disabled={!isDBRecipe}
        onClick={handleLike}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow transition
          ${
            isDBRecipe
              ? "bg-white/90 hover:scale-110"
              : "bg-gray-200 cursor-not-allowed"
          }
        `}
      >
        <span className={liked ? "text-red-500" : "text-gray-400"}>
          {liked ? "❤️" : "🤍"}
        </span>
      </button> */}

      {/* IMAGE */}
      <img
        src={imageUrl}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />

      {/* TITLE */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {recipe.title}
        </h3>
      </div>
    </div>
  );
};

export default FoodCard;
