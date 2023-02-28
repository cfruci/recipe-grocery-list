import { createContext, useState } from "react";
import { IngredientModel } from "../../models/recipe";
import Props from "../../models/props";

const initialGroceries: IngredientModel[] = [];

type groceriesObj = {
	groceries: IngredientModel[];
	addIngredients: (ingredients: IngredientModel[]) => void;
	deleteIngredient: (ingredient: IngredientModel) => void;
};

export const GroceriesContext = createContext<groceriesObj>({
	groceries: [],
	addIngredients: () => {},
	deleteIngredient: () => {},
});

export const GroceriesContextProvider: React.FC<Props> = (props) => {
	const [groceries, setGroceries] = useState(initialGroceries);

	const deleteIngredientHandler = (ingredient: IngredientModel) => {
		// const currentIngredient = ingredient.id;
	};

	const addIngredientsHandler = (ingredients: IngredientModel[]) => {
		ingredients.map((ingredient) => console.log(ingredient));
	};

	const groceryCtx: groceriesObj = {
		groceries,
		addIngredients: addIngredientsHandler,
		deleteIngredient: deleteIngredientHandler,
	};
	return (
		<GroceriesContext.Provider value={groceryCtx}>
			{props.children}
		</GroceriesContext.Provider>
	);
};
