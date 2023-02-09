import { useContext } from "react";

import { RecipeModel } from "../../../models/recipe";
import Ingredients from "../../Ingredients/Ingredients";
import styles from "./Recipe.module.css";
import { RecipesContext } from "../../store/recipes-context";

const Recipe: React.FC<{ recipe: RecipeModel }> = ({ recipe }) => {
	const ctx = useContext(RecipesContext);

	const onBtnClickHandler = (): void => {
		const ingredients = recipe.ingredients;
		ctx.addToGroceryList(ingredients);
	};

	const seeRecipeHandler = () => {
		// navigate('/recipe'+ )
	};

	return (
		<div className={styles.recipe}>
			<h2>{recipe.id}</h2>
			<Ingredients ingredients={recipe.ingredients} />
			<button onClick={seeRecipeHandler}>See Recipe</button>
			<button onClick={onBtnClickHandler}>Add to Grocery List</button>
		</div>
	);
};

export default Recipe;
