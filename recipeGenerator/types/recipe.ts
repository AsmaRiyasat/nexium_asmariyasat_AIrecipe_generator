// types/recipe.ts
export interface RecipeHistoryType {
  _id: string;
  title?: string;
  ingredients: string[] | string;
  instructions?: string;
}

