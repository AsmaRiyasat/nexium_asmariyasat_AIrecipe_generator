import clientPromise from "@/lib/mongo";

export async function getUserRecipes(userId: string) {
  const client = await clientPromise;
  const db = client.db("recipe-db"); //   DB name
  const recipes = await db
    .collection("recipes") //  a collection
    .find({ userId })
    .toArray();

  return recipes;
}
