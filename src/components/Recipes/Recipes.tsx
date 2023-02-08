import { useContext } from "react";
// import styles from "./Recipes.module.css";

import Recipe from "../Recipe/Recipe";
import { RecipesContext } from "../store/recipes-context";

const Recipes: React.FC = () => {
	const ctx = useContext(RecipesContext);
	return (
		<>
			<h2>My Recipes</h2>
			<ul>
				{ctx.recipes.map((recipe) => (
					<Recipe key={recipe.id} name={recipe.id} />
				))}
			</ul>
		</>
	);
};

export default Recipes;
