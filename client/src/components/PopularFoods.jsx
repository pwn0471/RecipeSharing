import { useState } from "react";
import useFetchPopularFood from "../hooks/useFetchPopularFood";
import FoodCard from "./FoodCard";
import LoadIcon from "../assets/loading.gif";

const PopularFoods = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 8;

  const { data, isLoading, isError } =
    useFetchPopularFood(pageNumber, pageSize);

  return (
    <section className="bg-gray-100 py-14">
      <h1 className="mb-10 text-center text-2xl font-bold text-gray-700">
        Popular Food Recipes
      </h1>

      {/* LOADING */}
      {isLoading && (
        <div className="flex justify-center">
          <img src={LoadIcon} alt="Loading" />
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <p className="text-center text-red-600 font-semibold">
          Something went wrong. Please try again later.
        </p>
      )}

      {/* EMPTY */}
      {!isLoading && data?.length === 0 && (
        <p className="text-center text-gray-600">
          No recipes found.
        </p>
      )}

      {/* FOOD GRID */}
      {data && data.length > 0 && (
        <>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((recipe) => (
              <FoodCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
              disabled={pageNumber === 1}
              className={`rounded px-5 py-2 font-semibold text-white transition ${
                pageNumber === 1
                  ? "bg-gray-400"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
            >
              Prev
            </button>

            <button
              onClick={() => setPageNumber((p) => p + 1)}
              disabled={data.length < pageSize}
              className={`rounded px-5 py-2 font-semibold text-white transition ${
                data.length < pageSize
                  ? "bg-gray-400"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default PopularFoods;
