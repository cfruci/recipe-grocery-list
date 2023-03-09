import { useState, createContext, useContext } from "react";

import { RecipeModel, IngredientModel } from "../../models/recipe";
import Props from "../../models/props";
import { GroceriesContext } from "./groceries-context";
import { initialRecipes } from "./initialRecipes";

type RecipesContextObj = {
	recipes: RecipeModel[];
	addRecipe: () => void;
	addIngredientToRecipe: (
		ingredient: IngredientModel,
		currentRecipeId: string
	) => void;
	deleteRecipe: (recipeId: string) => void;
	editRecipe: () => void;
	addRecipeToGroceryList: (ingredients: IngredientModel[]) => void;
};

export const RecipesContext = createContext<RecipesContextObj>({
	recipes: initialRecipes,
	addRecipe: () => {},
	addIngredientToRecipe: () => {},
	deleteRecipe: () => {},
	editRecipe: () => {},
	addRecipeToGroceryList: () => {},
});

export const RecipesContextProvider: React.FC<Props> = ({ children }) => {
	const [recipes, setRecipes] = useState<RecipeModel[]>(initialRecipes);
	const groceriesCtx = useContext(GroceriesContext);

	const addNewRecipeHandler = () => {
		setRecipes((prevRecipes) => prevRecipes.concat([]));
	};

	const addIngredientHandler = (
		newIngredient: IngredientModel,
		currentRecipeId: string
	) => {
		const [recipeToUpdate] = recipes.filter(
			(recipe) => recipe.id === currentRecipeId
		);
		const prevIngredients = [...recipeToUpdate.ingredients];
		const updatedRecipe = {
			...recipeToUpdate,
			ingredients: prevIngredients.concat(newIngredient),
		};
		setRecipes((prevRecipes) => {
			const indexToUpdate = prevRecipes.findIndex(
				(recipe) => recipe.id === currentRecipeId
			);
			const newRecipes = [...prevRecipes];
			newRecipes[indexToUpdate] = updatedRecipe;
			return newRecipes;
		});
	};

	const deleteRecipeHandler = () => {
		console.log("deleted recipe");
	};

	const editRecipeHandler = () => {
		console.log("edited recipe");
	};

	const addToGroceryListHandler = (ingredients: IngredientModel[]): void => {
		groceriesCtx.addIngredients(ingredients);
	};

	const recipesCtx: RecipesContextObj = {
		recipes,
		addRecipe: addNewRecipeHandler,
		addIngredientToRecipe: addIngredientHandler,
		deleteRecipe: deleteRecipeHandler,
		editRecipe: editRecipeHandler,
		addRecipeToGroceryList: addToGroceryListHandler,
	};

	return (
		<RecipesContext.Provider value={recipesCtx}>
			{children}
		</RecipesContext.Provider>
	);
};
