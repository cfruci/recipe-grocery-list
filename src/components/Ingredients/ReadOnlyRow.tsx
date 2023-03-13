import { useContext } from "react";
import { IngredientModel } from "../../models/recipe";
import { RecipesContext } from "../store/recipes-context";
import styles from "./ReadOnlyRow.module.css";

const ReadOnlyRow: React.FC<{
	ingredient: IngredientModel;
	recipeId: string;
}> = ({ ingredient, recipeId }) => {
	const recipesCtx = useContext(RecipesContext);

	const deleteHandler = () => {
		recipesCtx.deleteIngredientFromRecipe(ingredient.id, recipeId);
	};

	const editHandler = () => {
		recipesCtx.updateIngredient();
	};

	return (
		<tr>
			<td className={`${styles.ingredient} ${styles.leftColumn}`}>
				{ingredient.id}
			</td>
			<td>{ingredient.quantity}</td>
			<td>{ingredient.unit}</td>
			<td className={styles.actions}>
				<button className={styles.ingredientBtns} onClick={editHandler}>
					Edit
				</button>
				<button className={styles.ingredientBtns} onClick={deleteHandler}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default ReadOnlyRow;
