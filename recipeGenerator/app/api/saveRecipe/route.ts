
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
import { connectToDB } from "@/lib/mongo";
import Recipe from "@/models/RecipeHistory";

function extractTitle(raw: string): string {
  const lines = raw.trim().split("\n");
  return lines[0] || "Untitled Recipe";
}

function extractInstructions(raw: string): string {
  const match = raw.match(/Instructions:\s*([\s\S]*)/i);
  return match ? match[1].trim() : raw.trim();
}

export async function POST(req: NextRequest) {
  "use server";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { ingredients, recipe } = body;

    if (!ingredients || !recipe) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectToDB();

    const title =
      typeof recipe === "string"
        ? extractTitle(recipe)
        : recipe.title ?? "Untitled Recipe";

    const instructions =
      typeof recipe === "string"
        ? extractInstructions(recipe)
        : recipe.instructions ?? "No instructions provided";

    const ingredientsArray =
      typeof ingredients === "string" ? ingredients.split(",") : ingredients;

    const result = await Recipe.create({
      userId: user.id,
      title,
      ingredients: ingredientsArray,
      instructions,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Recipe saved", id: result._id });
  } catch (error) {
    console.error("Error saving recipe:", error);
    return NextResponse.json({ error: "Failed to save recipe" }, { status: 500 });
  }
}
