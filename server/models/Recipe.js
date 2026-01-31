import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    instruction: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    imageUrl: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ❤️ Users who liked this recipe
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Recipe", recipeSchema);
