type Recipe = {
	id: string;
	cuisine: string;
	ingredients: Ingredient[];
};

type Ingredient = {
	id: string;
	type: string;
	quantity: number;
	unit: string;
};

export default Recipe;
