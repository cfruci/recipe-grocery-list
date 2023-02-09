export type RecipeModel = {
	id: string;
	cuisine: string;
	ingredients: IngredientModel[];
};

export type IngredientModel = {
	id: string;
	type: string;
	quantity: number;
	unit: string;
};
