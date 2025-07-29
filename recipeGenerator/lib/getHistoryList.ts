// lib/getHistoryList.ts
import { connectToDB } from "./mongo";
import Recipe from "@/models/RecipeHistory";
import { createClient } from "@/lib/supabaseServer";
import { RecipeHistoryType } from "@/types/recipe";

export async function getHistoryList(): Promise<RecipeHistoryType[] | null> {
  await connectToDB();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const history = await Recipe.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .lean<RecipeHistoryType[]>(); // 👈 explicitly type lean result

  // Convert _id to string to avoid ObjectId serialization errors
  return history.map((recipe) => ({
    ...recipe,
    _id: recipe._id.toString(), // 👈 now type-safe
  }));
}

