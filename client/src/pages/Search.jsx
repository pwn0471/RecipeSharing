import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useSearch from "../hooks/useSearch";
import FoodCard from "../components/FoodCard";
import LoadIcon from "../assets/loading.gif";

const Search = () => {
  const { keyword: keywordParam, mealType: mealTypeParam } = useParams();

  const keyword = keywordParam === "random" ? "" : keywordParam;
  const mealType = mealTypeParam === "all" ? "" : mealTypeParam;

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 8;

  const { data, isLoading, isError } = useSearch(
    keyword,
    pageNumber,
    pageSize,
    mealType
  );

  // Reset page when search changes
  useEffect(() => {
    setPageNumber(1);
  }, [keyword, mealType]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <img src={LoadIcon} alt="Loading..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-600 font-semibold">
        Something went wrong. Please try again.
      </div>
    );
  }

  return (
    <section className="w-full bg-gray-100 p-6 min-h-screen">
      {/* MOBILE TITLE */}
      <div className="mb-4 md:hidden">
        <h1 className="text-lg font-semibold capitalize text-gray-700">
          {keyword || "All Recipes"}
          {mealType && ` / ${mealType}`}
        </h1>
      </div>

      {/* GRID */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data && data.length === 0 && (
          <p className="col-span-full text-center text-gray-600">
            No recipes found.
          </p>
        )}

        {data &&
          data.map((recipe) => (
            <FoodCard key={recipe.id} recipe={recipe} />
          ))}
      </div>

      {/* PAGINATION */}
      {data && data.length > 0 && (
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber === 1}
            className={`rounded px-4 py-2 font-semibold text-white ${
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
            className={`rounded px-4 py-2 font-semibold text-white ${
              data.length < pageSize
                ? "bg-gray-400"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Search;
