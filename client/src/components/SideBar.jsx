import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const params = useParams();

  const keyword = params.keyword || "random";
  const mealType = params.mealType || "all";

  const [isShow, setIsShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    keyword === "random" ? "" : keyword
  );

  const mealTypes = [
    { label: "Main Course", value: "main-course" },
    { label: "Side Dish", value: "side-dish" },
    { label: "Dessert", value: "dessert" },
    { label: "Appetizer", value: "appetizer" },
    { label: "Salad", value: "salad" },
    { label: "Bread", value: "bread" },
    { label: "Breakfast", value: "breakfast" },
    { label: "Soup", value: "soup" },
    { label: "Beverage", value: "beverage" },
    { label: "Sauce", value: "sauce" },
    { label: "Marinade", value: "marinade" },
    { label: "Fingerfood", value: "fingerfood" },
    { label: "Snack", value: "snack" },
    { label: "Drink", value: "drink" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/search/${searchTerm}/${mealType}`);
    setIsShow(false);
  };

  const handleMealTypeClick = (value) => {
    navigate(`/search/${keyword}/${value}`);
    setIsShow(false);
  };

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        className="fixed right-5 top-5 z-50 rounded-full bg-white/80 p-2 shadow backdrop-blur-md md:hidden"
        onClick={() => setIsShow(!isShow)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isShow ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-3/4
          bg-gradient-to-b from-orange-50 to-white
          border-r border-orange-100 p-6
          transition-transform duration-300
          md:static md:h-auto md:w-1/4 lg:w-1/5
          ${isShow ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* BRAND */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-orange-500"
            onClick={() => setIsShow(false)}
          >
            RecipeHub
          </Link>
        </div>

        {/* SEARCH */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <input
              type="text"
              placeholder="Find recipes..."
              className="w-full bg-transparent text-gray-800 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        {/* MEAL TYPES */}
        <div>
          <h2 className="mb-3 font-semibold text-gray-700">
            Meal Type
          </h2>

          <div className="flex flex-wrap gap-2">
            {mealTypes.map(({ label, value }) => {
              const isActive = mealType === value;

              return (
                <button
                  key={value}
                  disabled={isActive}
                  onClick={() => handleMealTypeClick(value)}
                  className={`
                    rounded-full px-3 py-1 text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}

            {/* ALL */}
            <button
              disabled={mealType === "all"}
              onClick={() => handleMealTypeClick("all")}
              className={`
                rounded-full px-3 py-1 text-sm font-medium transition
                ${
                  mealType === "all"
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }
              `}
            >
              All
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
