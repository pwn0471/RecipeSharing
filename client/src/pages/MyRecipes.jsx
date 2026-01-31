import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import { Trash2 } from "lucide-react";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        // 1️⃣ Get profile (favorites)
        const profileRes = await API.get("/auth/profile");
        setFavorites(profileRes.data.favorites || []);

        // 2️⃣ Get user recipes
        const userId = profileRes.data._id;
        const recipesRes = await API.get(`/recipes/user/${userId}`);
        setRecipes(recipesRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  // ❤️ Like / Unlike (UNCHANGED)
  const handleFavorite = async (recipeId) => {
    try {
      const isLiked = favorites.includes(recipeId);

      setFavorites((prev) =>
        isLiked
          ? prev.filter((id) => id !== recipeId)
          : [...prev, recipeId]
      );

      await API.put(`/auth/favorite/${recipeId}`);

      toast.success(
        isLiked
          ? "Removed from favorites ❌"
          : "You liked this recipe ❤️"
      );
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  // 🗑 Delete Recipe
  const handleDelete = async (recipeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/recipes/${recipeId}`);

      setRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== recipeId)
      );

      toast.success("Recipe deleted 🗑");
    } catch (error) {
      toast.error("Failed to delete recipe");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-600">You haven’t added any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => {
            const liked = favorites.includes(recipe._id);

            return (
              <div
                key={recipe._id}
                className="relative rounded-xl bg-white shadow p-4"
              >
                {/* RIGHT SIDE ACTION BUTTONS */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {/* ❤️ LIKE */}
                  <button
                    onClick={() => handleFavorite(recipe._id)}
                    className="bg-white p-2 rounded-full shadow"
                  >
                    <span
                      className={
                        liked ? "text-red-500" : "text-gray-400"
                      }
                    >
                      {liked ? "❤️" : "🤍"}
                    </span>
                  </button>

                  {/* 🗑 DELETE */}
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="bg-white p-2 rounded-full shadow text-red-500 hover:bg-red-50"
                    title="Delete recipe"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h2 className="font-semibold text-lg mb-2">
                  {recipe.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {recipe.instruction}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Ingredients: {recipe.ingredients.length}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
