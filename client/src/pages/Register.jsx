import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "User already exists or invalid data";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#fff3ee] to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-[400px]
          rounded-2xl
          bg-white/85 backdrop-blur-lg
          p-9
          shadow-[0_28px_65px_rgba(0,0,0,0.12)]
          text-center
        "
      >
        <h2 className="text-2xl font-bold text-[#ff6b4a] mb-1">
          Create Account ✨
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Join RecipeHub and share your recipes
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-[#ffe3de] px-3 py-2 text-sm text-[#c0392b]">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            py-3
            text-white
            font-semibold
            transition-all duration-300
            hover:bg-[#ff5430]
            disabled:opacity-60
          "
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#ff6b4a] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
