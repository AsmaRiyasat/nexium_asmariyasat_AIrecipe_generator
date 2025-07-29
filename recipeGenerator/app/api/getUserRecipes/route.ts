// app/api/getUserRecipes/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getUserRecipes } from "@/lib/actions/getUserRecipes";


export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const recipes = await getUserRecipes(userId);
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

