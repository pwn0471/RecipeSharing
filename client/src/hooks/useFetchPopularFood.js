import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const fetchPopularFood = async ({ queryKey }) => {
  const [, pageNumber, pageSize] = queryKey;

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&sort=popularity&number=${pageSize}&offset=${
      (pageNumber - 1) * pageSize
    }&addRecipeInformation=true`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular recipes");
  }

  const data = await response.json();
  return data.results;
};

const useFetchPopularFood = (pageNumber, pageSize) => {
  return useQuery({
    queryKey: ["popularFood", pageNumber, pageSize],
    queryFn: fetchPopularFood,
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });
};

export default useFetchPopularFood;
