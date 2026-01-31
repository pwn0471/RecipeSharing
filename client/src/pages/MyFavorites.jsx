import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

const MyFavorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // 1️⃣ get favorites ids
        const profileRes = await API.get("/auth/profile");
        const favoriteIds = profileRes.data.favorites || [];

        if (favoriteIds.length === 0) {
          setRecipes([]);
          return;
        }

        // 2️⃣ fetch each recipe
        const requests = favoriteIds.map((id) =>
          API.get(`/recipes/${id}`)
        );

        const responses = await Promise.all(requests);
        setRecipes(responses.map((r) => r.data));
      } catch (error) {
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Favorites ❤️</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-600">
          You haven’t liked any recipes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="rounded-xl bg-white shadow p-4"
            >
              <h2 className="font-semibold text-lg mb-2">
                {recipe.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-3">
                {recipe.instruction}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
