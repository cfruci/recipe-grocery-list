import { useContext, useState } from "react";
import styles from "./Recipes.module.css";

import Recipe from "./Recipe/Recipe";
import { RecipesContext } from "../store/recipes-context";

const Recipes: React.FC = () => {
	const [cuisine, setCuisine] = useState("Mexican");
	const ctx = useContext(RecipesContext);
	const onCuisineChangeHandler = (event: any): void => {
		setCuisine(event.target.value);
	};

	return (
		<>
			<label htmlFor="cuisine">Cuisine:</label>
			<select id="cuisine" onChange={onCuisineChangeHandler}>
				<option value=""></option>
				<option value="Mexican">Mexican</option>
				<option value="Mediterranean">Mediterranean</option>
			</select>

			<ul className={styles.recipes}>
				{ctx.recipes
					.filter((recipe) => recipe.cuisine === cuisine)
					.map((recipe) => (
						<Recipe key={recipe.id} recipe={recipe} />
					))}
			</ul>
		</>
	);
};

export default Recipes;
