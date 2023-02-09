import { useContext, useState } from "react";
import styles from "./Recipes.module.css";

import Recipe from "./Recipe/Recipe";
import { RecipesContext } from "../store/recipes-context";

const Recipes: React.FC = () => {
	const ctx = useContext(RecipesContext);
	const [cuisine, setCuisine] = useState("All");

	const onCuisineChangeHandler = (event: any): void => {
		setCuisine(event.target.value);
	};

	let recipes = ctx.recipes.map((recipe) => (
		<Recipe key={recipe.id} recipe={recipe} />
	));

	if (cuisine !== "All") {
		recipes = ctx.recipes
			.filter((recipe) => recipe.cuisine === cuisine)
			.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
	}

	const cuisines = ctx.recipes.map((recipe) => recipe.cuisine);

	return (
		<>
			<label htmlFor="cuisine">Choose Cuisine:</label>
			<select id="cuisine" onChange={onCuisineChangeHandler}>
				<option defaultValue={"All"} value="All">
					All
				</option>
				{cuisines.map((cuisine) => (
					<option key={cuisine} value={cuisine}>
						{cuisine}
					</option>
				))}
			</select>

			<ul className={styles.recipes}>{recipes}</ul>
		</>
	);
};

export default Recipes;
