import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 redirect back to protected page after login
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ BACKEND LOGIN
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));


      // ✅ SAVE USER (THIS WAS MISSING ❌)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful 🎉");

      // redirect to previous protected page
      navigate(from, { replace: true });

    } catch (err) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#fff3ee] to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-[380px]
          rounded-2xl
          bg-white/80 backdrop-blur-lg
          p-9
          shadow-[0_25px_60px_rgba(0,0,0,0.12)]
          text-center
        "
      >
        <h2 className="text-2xl font-bold text-[#ff6b4a] mb-1">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Login to share and explore recipes
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-[#ffe3de] px-3 py-2 text-sm text-[#c0392b]">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            w-full mb-4
            rounded-lg border border-gray-300
            px-3 py-2.5 text-sm
            outline-none
            focus:border-[#ff6b4a]
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            w-full mb-5
            rounded-lg border border-gray-300
            px-3 py-2.5 text-sm
            outline-none
            focus:border-[#ff6b4a]
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-[#ff6b4a]
            py-2.5
            text-white
            font-semibold
            transition-all duration-300
            hover:bg-[#ff5430]
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#ff6b4a] hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
