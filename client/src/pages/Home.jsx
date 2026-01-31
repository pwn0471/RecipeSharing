import homeimg from "../assets/homeimg.png";
import MealType from "../components/MealType";
import PopularFoods from "../components/PopularFoods";
import MyRecipes from "./MyRecipes";

const Home = () => {
  return (
    <>
      {/* HERO SECTION (unchanged) */}
      <section className="min-h-[calc(100vh-56px)] bg-white flex items-center justify-center px-20 pt-[30px] pb-[60px] max-[900px]:px-5">
        <div
          className="
            w-full max-w-[1300px]
            flex flex-row items-center justify-between gap-[80px]
            flex-nowrap
            max-[900px]:flex-col max-[900px]:text-center
          "
        >
          {/* LEFT TEXT */}
          <div
            className="
              relative flex-1 pl-7
              animate-slideInLeft
              max-[900px]:pl-0
            "
          >
            <span
              className="
                absolute left-0 top-[6px]
                h-[92%] w-[6px]
                rounded
                bg-[#ff6b4a]
                max-[900px]:hidden
              "
            />

            <h1 className="text-[48px] font-extrabold leading-[1.2] text-[#1f1f1f] mb-[14px] max-[900px]:text-[36px]">
              Discover Recipes <br /> Made to Be Shared
            </h1>

            <p className="text-[18px] text-[#666] max-w-[420px] max-[900px]:mx-auto">
              Cook, explore, and share recipes from <br />real kitchens around the world. 
              
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center animate-fadeIn">
            <img
              src={homeimg}
              alt="Food Illustration"
              className="
                w-full max-w-[680px]
                animate-floatParallax
                max-[900px]:max-w-[420px]
              "
            />
          </div>
        </div>
      </section>

      {/* MEAL TYPE SECTION (NEW) */}
      <MealType />
      <PopularFoods />
      <MyRecipes/>
    </>
  );
};

export default Home;
