import { useQuery } from "@tanstack/react-query";

const useSearch = (keyword, pageNumber, pageSize, mealType) => {
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const fetchFood = async ({ queryKey }) => {
    const [, keyword, pageNumber, pageSize, mealType] = queryKey;

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${keyword}&addRecipeInformation=true&number=${pageSize}&offset=${
        (pageNumber - 1) * pageSize
      }&type=${mealType}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    return data.results;
  };

  return useQuery({
    queryKey: ["recipes", keyword, pageNumber, pageSize, mealType],
    queryFn: fetchFood,
    keepPreviousData: true,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export default useSearch;
