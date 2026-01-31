import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MealTypeCard from "./MealTypeCard";

// icons
import DinnerIcon from "../assets/dinner.png";
import BreakfastIcon from "../assets/breakfast.png";
import SnackIcon from "../assets/snack.png";
import DessertIcon from "../assets/dessert.png";
import AppetizerIcon from "../assets/appetizer.png";
import SaladIcon from "../assets/salad.png";
import BreadIcon from "../assets/bread.png";
import SoupIcon from "../assets/soup.png";
import BeverageIcon from "../assets/beverage.png";
import SauceIcon from "../assets/sauce.png";
import MarinadeIcon from "../assets/marinade.png";
import DrinkIcon from "../assets/drink.png";

const MealType = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // 🔑 IMPORTANT: convert title → URL-safe
  const handleNavigate = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/search/random/${slug}`);
  };

  const basicMeals = [
    { icon: DinnerIcon, title: "Main Course" },
    { icon: DessertIcon, title: "Dessert" },
    { icon: AppetizerIcon, title: "Appetizer" },
    { icon: SaladIcon, title: "Salad" },
    { icon: BreadIcon, title: "Bread" },
  ];

  const extraMeals = [
    { icon: BreakfastIcon, title: "Breakfast" },
    { icon: SoupIcon, title: "Soup" },
    { icon: BeverageIcon, title: "Beverage" },
    { icon: SauceIcon, title: "Sauce" },
    { icon: MarinadeIcon, title: "Marinade" },
    { icon: SnackIcon, title: "Snack" },
    { icon: DrinkIcon, title: "Drink" },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-700">
        Find Your Type of Meal
      </h1>

      {/* GRID */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {basicMeals.map((meal) => (
          <MealTypeCard
            key={meal.title}
            icon={meal.icon}
            title={meal.title}
            onClick={() => handleNavigate(meal.title)}
          />
        ))}

        {showMore &&
          extraMeals.map((meal) => (
            <MealTypeCard
              key={meal.title}
              icon={meal.icon}
              title={meal.title}
              onClick={() => handleNavigate(meal.title)}
            />
          ))}
      </div>

      {/* MORE / LESS */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setShowMore((prev) => !prev)}
          className="flex flex-col items-center font-semibold text-gray-700"
        >
          <span>{showMore ? "Less" : "More"}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 h-6 w-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={
                showMore
                  ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                  : "M19.5 8.25l-7.5 7.5-7.5-7.5"
              }
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default MealType;
