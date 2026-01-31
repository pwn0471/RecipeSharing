import { useQuery } from "@tanstack/react-query";
import API from "../services/api";

const useFetchRecipe = (recipeId) => {
  const SPOONACULAR_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const fetchRecipe = async () => {
    if (!recipeId) {
      throw new Error("Recipe ID is missing");
    }

    // 🟢 MongoDB recipe (ObjectId = 24 chars)
    const isMongoRecipe = recipeId.length === 24;

    if (isMongoRecipe) {
      const res = await API.get(`/recipes/${recipeId}`);
      return res.data;
    }

    // 🔵 Spoonacular recipe
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Spoonacular recipe");
    }

    return res.json();
  };

  return useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: fetchRecipe,
    enabled: !!recipeId,
    staleTime: 60 * 1000,      // 1 minute
    cacheTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  });
};

export default useFetchRecipe;
