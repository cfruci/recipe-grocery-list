import { useState, createContext, useContext } from "react";

import { RecipeModel, IngredientModel } from "../../models/recipe";
import Props from "../../models/props";
import { GroceriesContext } from "./groceries-context";
import { initialRecipes } from "./initialRecipes";

type RecipesContextObj = {
	recipes: RecipeModel[];
	addRecipe: (newRecipe: RecipeModel) => void;
	deleteRecipe: (recipeId: string) => void;
	addIngredientToRecipe: (
		ingredient: IngredientModel,
		currentRecipeId: string
	) => void;
	deleteIngredientFromRecipe: (
		ingredientId: string,
		currentRecipeId: string
	) => void;
	updateIngredient: (
		ingredient: IngredientModel,
		currentRecipe: RecipeModel
	) => void;
	cancelUpdate: () => void;
	inEditMode: boolean;
	addRecipeToGroceryList: (ingredients: IngredientModel[]) => void;
};

export const RecipesContext = createContext<RecipesContextObj>({
	recipes: initialRecipes,
	addRecipe: () => {},
	deleteRecipe: () => {},
	addIngredientToRecipe: () => {},
	deleteIngredientFromRecipe: () => {},
	updateIngredient: () => {},
	cancelUpdate: () => {},
	inEditMode: false,
	addRecipeToGroceryList: () => {},
});

export const RecipesContextProvider: React.FC<Props> = ({ children }) => {
	const [recipes, setRecipes] = useState<RecipeModel[]>(initialRecipes);
	const [inEditMode, setInEditMode] = useState(false);

	const groceriesCtx = useContext(GroceriesContext);

	const addNewRecipeHandler = (newRecipe: RecipeModel) => {
		console.log(newRecipe);
		setRecipes((prevRecipes) => prevRecipes.concat(newRecipe));
		console.log(recipes);
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

	const deleteIngredientHandler = (
		ingredientId: string,
		currentRecipeId: string
	) => {
		const [recipeToUpdate] = recipes.filter(
			(recipe) => recipe.id === currentRecipeId
		);
		const prevIngredients = [...recipeToUpdate.ingredients];
		const updatedRecipe = {
			...recipeToUpdate,
			ingredients: prevIngredients.filter(
				(ingredient) => ingredient.id !== ingredientId
			),
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

	const updateIngredientHandler = (
		ingredient: IngredientModel,
		currentRecipe: RecipeModel
	) => {
		const [recipeToUpdate] = recipes.filter(
			(recipe) => recipe.id === currentRecipe.id
		);
		const prevIngredients = [...recipeToUpdate.ingredients];

		const updatedIngredients = prevIngredients.map((prevIngredient) => {
			if (prevIngredient.id === ingredient.id) {
				return ingredient;
			}
			return prevIngredient;
		});

		const updatedRecipe = {
			...recipeToUpdate,
			ingredients: updatedIngredients,
		};
		setRecipes((prevRecipes) => {
			const indexToUpdate = prevRecipes.findIndex(
				(recipe) => recipe.id === currentRecipe.id
			);
			const newRecipes = [...prevRecipes];
			newRecipes[indexToUpdate] = updatedRecipe;
			return newRecipes;
		});
	};

	const cancelUpdateHandler = () => {
		setInEditMode(false);
	};

	const addToGroceryListHandler = (ingredients: IngredientModel[]): void => {
		groceriesCtx.addIngredients(ingredients);
	};

	const recipesCtx: RecipesContextObj = {
		recipes,
		addRecipe: addNewRecipeHandler,
		deleteRecipe: deleteRecipeHandler,
		addIngredientToRecipe: addIngredientHandler,
		deleteIngredientFromRecipe: deleteIngredientHandler,
		updateIngredient: updateIngredientHandler,
		cancelUpdate: cancelUpdateHandler,
		inEditMode: inEditMode,
		addRecipeToGroceryList: addToGroceryListHandler,
	};

	return (
		<RecipesContext.Provider value={recipesCtx}>
			{children}
		</RecipesContext.Provider>
	);
};
