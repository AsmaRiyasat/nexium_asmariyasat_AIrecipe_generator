
'use client';

import { useState } from "react";
import type { RecipeHistoryType } from "@/types/recipe";

type Props = {
  history: RecipeHistoryType[];
};

export function HistoryList({ history }: Props) {
  const [list, setList] = useState<RecipeHistoryType[]>(history);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/deleteRecipe?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete: ${res.statusText}`);
      }

      setList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  if (!list.length) {
    return <p className="text-center py-8 text-white">No recipes yet.</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Recipe History</h2>
      <ul className="flex flex-col gap-6">
        {list.map((recipe) => (
          <li
            key={recipe._id}
            className="relative rounded-2xl bg-white/10 backdrop-blur-md shadow-md border border-white/20 p-6 w-full break-words"
          >
            {/* Delete button */}
            <button
              onClick={() => handleDelete(recipe._id)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm"
              aria-label="Delete recipe"
            >
              Delete
            </button>

            <h3 className="text-xl font-semibold mb-2">
              {recipe.title?.trim() || "Untitled Recipe"}
            </h3>

            <p className="mb-2">
              <strong>Ingredients:</strong>{" "}
              {Array.isArray(recipe.ingredients)
                ? recipe.ingredients.join(", ")
                : recipe.ingredients}
            </p>

            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              <strong className="block mb-1">Recipe:</strong>
              {recipe.instructions?.trim() || "No recipe text provided."}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
