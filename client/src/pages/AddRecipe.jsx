import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "" },
  ]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!title || !instruction) {
      return toast.error("Title and instruction required");
    }

    const filteredIngredients = ingredients.filter(
      (ing) => ing.name && ing.quantity
    );

    if (filteredIngredients.length === 0) {
      return toast.error("Add at least one ingredient");
    }

    try {
      setLoading(true);

      // 🔑 GET TOKEN
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      await API.post(
        "/recipes", // ✅ CORRECT ROUTE
        {
          title,
          instruction,
          ingredients: filteredIngredients,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ REQUIRED
          },
        }
      );

      toast.success("Recipe added successfully 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add recipe"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#fff3ee] to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Recipe
        </h2>

        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          placeholder="Instructions"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <h4 className="font-semibold mb-2">Ingredients</h4>

        {ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={ing.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              className="w-28 p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="text-sm text-orange-500 mb-3"
        >
          + Add Ingredient
        </button>

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
