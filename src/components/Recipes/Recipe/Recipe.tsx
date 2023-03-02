import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeModel } from "../../../models/recipe";
import styles from "./Recipe.module.css";
import { RecipesContext } from "../../store/recipes-context";

const Recipe: React.FC<{ recipe: RecipeModel }> = ({ recipe }) => {
	const recipesCtx = useContext(RecipesContext);
	const [addedToGroceryList, setAddedToGroceryList] = useState(false);
	const navigate = useNavigate();

	const onBtnClickHandler = (event: any): void => {
		event.stopPropagation();
		const ingredients = recipe.ingredients;
		recipesCtx.addRecipeToGroceryList(ingredients);
		setAddedToGroceryList(true);
	};

	const seeRecipeHandler = (event: any) => {
		navigate("/recipes/" + recipe.id);
	};

	return (
		<div className={styles.recipe} onClick={seeRecipeHandler}>
			<h2>{recipe.id}</h2>
			<p>{recipe.description}</p>
			{!addedToGroceryList ? (
				<button onClick={onBtnClickHandler}>Add to Grocery List</button>
			) : (
				<div className={styles.added}>Added!</div>
			)}
		</div>
	);
};

export default Recipe;
