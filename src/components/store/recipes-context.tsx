import { useState, createContext } from "react";
import { RecipeModel, IngredientModel } from "../../models/recipe";
import Props from "../../models/props";

const initialGroceries: IngredientModel[] = [];

const initialRecipes = [
	{
		id: "Turkey Bake",
		cuisine: "Mexican",
		ingredients: [
			{
				id: "Jalapeno",
				type: "Vegetable",
				quantity: 1,
				unit: "",
			},
			{
				id: "Ground Turkey",
				type: "Meat",
				quantity: 1,
				unit: "lb",
			},
		],
	},
	{
		id: "Greek Chicken",
		cuisine: "Mediterranean",
		ingredients: [
			{
				id: "Gold Potatoes",
				type: "Vegetable",
				quantity: 4,
				unit: "",
			},
			{
				id: "Lemon",
				type: "Fruit",
				quantity: 2,
				unit: "",
			},
		],
	},
];

type RecipesContextObj = {
	recipes: RecipeModel[];
	groceryList: IngredientModel[];
	addToGroceryList: (ingredients: IngredientModel[]) => void;
	addNewRecipe: () => void;
	deleteRecipe: () => void;
	editRecipe: () => void;
};

export const RecipesContext = createContext<RecipesContextObj>({
	recipes: initialRecipes,
	groceryList: [],
	addToGroceryList: (ingredients: IngredientModel[]) => {},
	addNewRecipe: () => {},
	deleteRecipe: () => {},
	editRecipe: () => {},
});

export const RecipesContextProvider: React.FC<Props> = ({ children }) => {
	const [recipes, setRecipes] = useState<RecipeModel[]>(initialRecipes);
	const [groceries, setGroceries] = useState(initialGroceries);

	const addNewRecipeHandler = () => {
		setRecipes((prevRecipes) => prevRecipes.concat([]));
	};

	const deleteRecipeHandler = () => {
		console.log("deleted recipe");
	};

	const editRecipeHandler = () => {
		console.log("edited recipe");
	};

	const addToGroceryListHandler = (ingredients: IngredientModel[]) => {
		// groceries.map((groceryItem) => {
		// 	const currentItemId = groceryItem.id;
		// });
		setGroceries((prevGroceries) => prevGroceries.concat(ingredients));
	};

	const recipesCtx: RecipesContextObj = {
		recipes,
		groceryList: groceries,
		addToGroceryList: addToGroceryListHandler,
		addNewRecipe: addNewRecipeHandler,
		deleteRecipe: deleteRecipeHandler,
		editRecipe: editRecipeHandler,
	};

	return (
		<RecipesContext.Provider value={recipesCtx}>
			{children}
		</RecipesContext.Provider>
	);
};
