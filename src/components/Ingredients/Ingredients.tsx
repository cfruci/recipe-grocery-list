import { useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Ingredients.module.css";
import { RecipesContext } from "../store/recipes-context";
import { IngredientModel } from "../../models/recipe";
import ReadOnlyRow from "./ReadOnlyRow";
import EditOnlyRow from "./EditOnlyRow";

const Ingredients: React.FC = () => {
	const recipesCtx = useContext(RecipesContext);
	const params = useParams();

	const newIngredientName = useRef<HTMLInputElement>(null);
	const newIngredientQuantity = useRef<HTMLInputElement>(null);
	const newIngredientUnit = useRef<HTMLInputElement>(null);

	const [currentRecipe] =
		recipesCtx.recipes &&
		recipesCtx.recipes.filter((recipe) => recipe.id === params.recipeId);

	const addIngredientHandler = (event: React.FormEvent): void => {
		event.preventDefault();

		const newIngredient: IngredientModel = {
			id: newIngredientName.current!.value,
			type: newIngredientName.current!.value,
			quantity: parseInt(newIngredientQuantity.current!.value),
			unit: newIngredientUnit.current!.value,
		};
		if (currentRecipe?.id) {
			recipesCtx.addIngredientToRecipe(newIngredient, currentRecipe.id);
		}
	};

	const navigate = useNavigate();
	const onClickHandler = () => {
		navigate("/recipes");
	};

	return (
		<section className={styles.ingredients}>
			<button onClick={onClickHandler}>Back to All Recipes</button>
			<hr />
			<table className={styles.ingredientTable}>
				<thead className={styles.thead}>
					<tr>
						<th className={styles.leftColumn}>Ingredient</th>
						<th>Quantity</th>
						<th>Unit</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{recipesCtx.inEditMode &&
						currentRecipe.ingredients.map((ingredient) => {
							return (
								<EditOnlyRow key={ingredient.id} ingredient={ingredient} />
							);
						})}
					{!recipesCtx.inEditMode &&
						currentRecipe.ingredients.map((ingredient) => {
							return (
								<ReadOnlyRow
									key={ingredient.id}
									ingredient={ingredient}
									recipeId={currentRecipe.id}
								/>
							);
						})}
				</tbody>
			</table>
			<h3>Add New Ingredient</h3>
			<form
				onSubmit={(event: React.FormEvent) => addIngredientHandler(event)}
				className={styles.newIngredient}
			>
				<input type="text" placeholder="Ingredient" ref={newIngredientName} />
				<input
					type="number"
					placeholder="Quantity"
					defaultValue={0}
					min={0}
					ref={newIngredientQuantity}
				/>
				<input type="text" placeholder="Unit" ref={newIngredientUnit} />

				<button className={styles.ingredientBtns}>Add Ingredient</button>
			</form>
		</section>
	);
};

export default Ingredients;
