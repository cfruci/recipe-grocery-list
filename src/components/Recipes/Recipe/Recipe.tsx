import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeModel } from "../../../models/recipe";
import styles from "./Recipe.module.css";
import { RecipesContext } from "../../store/recipes-context";

const Recipe: React.FC<{ recipe: RecipeModel }> = ({ recipe }) => {
	const recipesCtx = useContext(RecipesContext);
	const navigate = useNavigate();

	const onBtnClickHandler = (event: any): void => {
		event.stopPropagation();
		const ingredients = recipe.ingredients;
		recipesCtx.addRecipeToGroceryList(ingredients);
	};

	const seeRecipeHandler = (event: any) => {
		navigate("/recipes/" + recipe.id);
	};

	return (
		<div className={styles.recipe} onClick={seeRecipeHandler}>
			<h2>{recipe.id}</h2>
			<p>{recipe.description}</p>
			<button onClick={onBtnClickHandler}>Add to Grocery List</button>
		</div>
	);
};

export default Recipe;
