import styles from "./ReadOnlyRow.module.css";

import { IngredientModel } from "../../models/recipe";

const ReadOnlyRow: React.FC<{
	ingredient: IngredientModel;
	recipeId: string;
	editClickHandler: (ingredient: IngredientModel) => void;
	deleteClickHandler: (ingredientId: string) => void;
}> = ({ ingredient, recipeId, editClickHandler, deleteClickHandler }) => {
	return (
		<tr>
			<td className={`${styles.ingredient} ${styles.leftColumn}`}>
				{ingredient.id}
			</td>
			<td>{ingredient.quantity}</td>
			<td>{ingredient.unit}</td>
			<td className={styles.actions}>
				<button
					className={styles.ingredientBtns}
					onClick={() => editClickHandler(ingredient)}
				>
					Edit
				</button>
				<button
					className={styles.ingredientBtns}
					onClick={() => deleteClickHandler(ingredient.id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default ReadOnlyRow;
