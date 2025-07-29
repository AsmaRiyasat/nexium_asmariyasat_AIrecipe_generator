// lib/actions/getUserRecipes.ts
import { connectToDB } from "@/lib/mongo";

export async function getUserRecipes(userId: string) {
  const mongoose = await connectToDB();

  // Get the native MongoDB client from the mongoose connection
  const db = mongoose.connection.getClient().db("recipe-db");

  const recipes = await db
    .collection("recipes") // Collection name
    .find({ userId })
    .toArray();

  return recipes;
}
