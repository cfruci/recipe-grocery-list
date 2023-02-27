import { createContext, useState } from "react";
import { IngredientModel } from "../../models/recipe";
import Props from "../../models/props";

const initialGroceries: IngredientModel[] = [];

type groceryListObj = {
	groceryList: IngredientModel[];
	addIngredients: (ingredients: IngredientModel[]) => void;
	deleteIngredient: (ingredient: IngredientModel) => void;
};

export const GroceriesContext = createContext<groceryListObj>({
	groceryList: [],
	addIngredients: () => {},
	deleteIngredient: () => {},
});

export const GroceriesContextProvider: React.FC<Props> = (props) => {
	const [groceries, setGroceries] = useState(initialGroceries);

	const deleteIngredientHandler = (ingredient: IngredientModel) => {
		console.log("ingredient deleted");
	};

	const addIngredientsHandler = (ingredients: IngredientModel[]) => {
		setGroceries((prevGroceries) => prevGroceries.concat(ingredients));
	};

	const groceryCtx = {
		groceryList: groceries,
		addIngredients: addIngredientsHandler,
		deleteIngredient: deleteIngredientHandler,
	};
	return (
		<GroceriesContext.Provider value={groceryCtx}>
			{props.children}
		</GroceriesContext.Provider>
	);
};
