import { useContext, useState } from "react";

import { Form } from "react-router-dom";
import { RecipesContext } from "../store/recipes-context";
import styles from "./NewRecipe.module.css";

const NewRecipe: React.FC = () => {
	const recipesCtx = useContext(RecipesContext);
	// const [ingredientRows, setIngredientRows] = useState([0]);

	const addNewIngredient = () => {
		console.log("ingredient added");
	};
	const onSubmitHandler = () => {
		recipesCtx.addRecipe();
	};

	return (
		<Form action="" onSubmit={onSubmitHandler} className={styles.form}>
			<h2>Add New Recipe</h2>
			<div className={styles.control}>
				<label htmlFor="name">Recipe Name:</label>
				<input type="text" id="name" />
			</div>
			<div className={styles.control}>
				<label htmlFor="newIngredient">Ingredient:</label>
				<input type="text" id="newIngredient" placeholder="name" />
				<input type="text" id="newIngredient" placeholder="quantity" />
				<input type="text" id="newIngredient" placeholder="unit" />
				<button onClick={addNewIngredient} className={styles.addIngredientBtn}>
					+ Ingredient
				</button>
			</div>
			<button disabled={false}>Add Recipe</button>
		</Form>
	);
};

export default NewRecipe;
