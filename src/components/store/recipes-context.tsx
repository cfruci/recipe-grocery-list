import { useState, createContext } from "react";
import Recipe from "../../models/recipe";
import Props from "../../models/props";

const initialRecipes = [
	{
		id: "Turkey Bake",
		cuisine: "Mexican",
		ingredients: [
			{
				id: "jalapeno",
				type: "vegetable",
				quantity: 1,
				unit: "",
			},
			{
				id: "ground_turkey",
				type: "meat",
				quantity: 1,
				unit: "lb",
			},
		],
	},
];

type RecipesContextObj = {
	recipes: Recipe[];
	addRecipe: () => void;
	deleteRecipe: () => void;
	editRecipe: () => void;
};

export const RecipesContext = createContext<RecipesContextObj>({
	recipes: initialRecipes,
	addRecipe: () => {},
	deleteRecipe: () => {},
	editRecipe: () => {},
});

export const RecipesContextProvider: React.FC<Props> = ({ children }) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const addRecipeHandler = () => {
		setRecipes((prevRecipes) => prevRecipes.concat([]));
	};

	const deleteRecipeHandler = () => {
		console.log("added new recipe");
	};

	const editRecipeHandler = () => {
		console.log("added new recipe");
	};

	const recipesCtx: RecipesContextObj = {
		recipes,
		addRecipe: addRecipeHandler,
		deleteRecipe: deleteRecipeHandler,
		editRecipe: editRecipeHandler,
	};

	return (
		<RecipesContext.Provider value={recipesCtx}>
			{children}
		</RecipesContext.Provider>
	);
};
