export type RecipeModel = {
  _id?: string;
  recipeName: string;
  slug?: string;
  cuisine: string;
  addedToGroceryList?: boolean;
  ingredients: IngredientModel[];
};

export type IngredientModel = {
  _id?: string;
  ingredientName: string;
  type: string;
  quantity: number;
  unit?: string;
};
