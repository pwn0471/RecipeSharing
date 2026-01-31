import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔍 SEARCH HANDLER (PUBLIC)
  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      toast.error("Please enter something to search 🔍");
      return;
    }

    navigate(`/search/${value}/all`);
    setSearchTerm("");
    setOpen(false); // close mobile drawer if open
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-[1000] w-full bg-gradient-to-r from-[#ff5f4a] to-[#ff845e]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            <span className="text-white">Recipe</span>
            <span className="text-[#4ade80]">Hub</span>
          </Link>

          {/* 🔍 DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="relative hidden flex-1 max-w-[420px] md:block"
          >
            <input
              type="text"
              placeholder="What are you craving today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full px-4 py-3 pr-11 text-sm outline-none shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-600"
            >
              🔍
            </button>
          </form>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="text-3xl text-white md:hidden"
            aria-label="Menu"
          >
            ☰
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>

             {token && (
               <Link to="/favorites" className="nav-link">
                 Favorites 
                </Link>
              )}


            {token && (
              <Link to="/add-recipe" className="nav-link">
                Create
              </Link>
            )}

            {!token ? (
              <Link
                to="/login"
                className="rounded-full bg-white px-5 py-2 font-semibold text-[#ff5f4a]"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("Logged out 👋");
                  navigate("/login");
                }}
                className="rounded-full bg-white px-5 py-2 font-semibold text-[#ff5f4a]"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* 📱 MOBILE DRAWER */}
      <aside
        className={`fixed top-0 right-0 z-[1001] h-screen w-[260px] bg-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-2xl"
        >
          ✕
        </button>

        <div className="flex flex-col gap-6 px-6 pt-20">

          {/* 🔍 MOBILE SEARCH */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border px-4 py-3 pr-10 text-sm outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              🔍
            </button>
          </form>

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>

          {token && (
            <Link to="/add-recipe" onClick={() => setOpen(false)}>
              Create
            </Link>
          )}
        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[900] bg-black/40"
        />
      )}
    </>
  );
}
