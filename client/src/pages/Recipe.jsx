import { useParams } from "react-router-dom";
import { useEffect } from "react";

import useFetchRecipe from "../hooks/useFetchRecipe";
import LoadIcon from "../assets/loading.gif";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, isError } = useFetchRecipe(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <img src={LoadIcon} alt="Loading..." />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-600 font-semibold">
        Something went wrong. Please try again later.
      </div>
    );
  }

  const recipeImage =
    recipe.image ||
    "https://via.placeholder.com/640x360?text=No+Image";

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* IMAGE */}
        <div className="lg:w-2/5">
          <img
            src={recipeImage}
            alt={recipe.title}
            className="w-full rounded-xl object-cover shadow"
          />
        </div>

        {/* DETAILS */}
        <div className="lg:w-3/5">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            {recipe.title}
          </h1>

          {/* SUMMARY */}
          {recipe.summary && (
            <div
              className="mb-6 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          )}

          {/* META */}
          <div className="mb-8 flex flex-wrap gap-8 text-gray-700">
            <p>
              <strong>Cooking Time:</strong> {recipe.readyInMinutes} mins
            </p>
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
          </div>

          {/* INGREDIENTS */}
          {recipe.extendedIngredients?.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">
                Ingredients
              </h2>
              <ul className="list-disc space-y-1 pl-6">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* INSTRUCTIONS */}
          {recipe.analyzedInstructions?.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Cooking Process
              </h2>

              {recipe.analyzedInstructions.map((instruction, index) => (
                <div key={index} className="mb-6">
                  {instruction.name && (
                    <h3 className="mb-2 font-semibold">
                      {instruction.name}
                    </h3>
                  )}

                  <ol className="list-decimal space-y-2 pl-6">
                    {instruction.steps.map((step) => (
                      <li key={step.number}>
                        {step.step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};



export default Recipe;
