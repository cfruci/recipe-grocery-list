import { useContext } from "react";
// import styles from "./Recipes.module.css";

import Recipe from "./Recipe";
import { RecipesContext } from "./store/recipes-context";

const Recipes: React.FC = () => {
	const ctx = useContext(RecipesContext);
	return (
		<ul>
			{ctx.recipes.map((recipe) => (
				<Recipe key={recipe.id} name={recipe.id} />
			))}
		</ul>
	);
};

export default Recipes;
