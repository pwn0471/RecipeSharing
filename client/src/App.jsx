import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import AddRecipe from "./pages/AddRecipe";
import Search from "./pages/Search";
import Recipe from "./pages/Recipe";
import MyRecipes from "./pages/MyRecipes"; // ✅ ADDED
import MyFavorites from "./pages/MyFavorites";
// Layout
import SideBarLayout from "./layout/SideBarLayout";

function App() {
  return (
    <>
      {/* 🌐 Navbar */}
      <Navbar />

      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔍 PUBLIC SEARCH */}
        <Route
          path="/search/:keyword/:mealType"
          element={
            <SideBarLayout>
              <Search />
            </SideBarLayout>
          }
        />

        {/* 🔐 PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/my-recipes" element={<MyRecipes />} /> {/* ✅ ADDED */}
          <Route path="/favorites" element={<MyFavorites />} />
        </Route>
      </Routes>


      

      {/* 🌐 FOOTER */}
      <Footer />
    </>
  );
}

export default App;
