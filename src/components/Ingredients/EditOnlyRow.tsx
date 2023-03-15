import styles from "./EditOnlyRow.module.css";

import { IngredientModel } from "../../models/recipe";

const EditOnlyRow: React.FC<{
	ingredient: IngredientModel;
	cancelClickHandler: () => void;
	saveClickHandler: () => void;
	editFormData: IngredientModel;
	onEditChangeHandler: (ingredient: IngredientModel) => void;
}> = ({
	ingredient,
	cancelClickHandler,
	saveClickHandler,
	editFormData,
	onEditChangeHandler,
}) => {
	return (
		<tr key={ingredient.id}>
			<td className={styles.leftColumn}>{ingredient.id}</td>
			<td>
				<input
					type="number"
					value={editFormData.quantity}
					onChange={() => onEditChangeHandler(ingredient)}
				/>
			</td>
			<td>
				<input
					type="text"
					value={editFormData.unit}
					onChange={() => onEditChangeHandler(ingredient)}
				/>
			</td>
			<td className={styles.ingredientActions}>
				<button
					className={styles.ingredientBtns}
					onClick={() => saveClickHandler()}
				>
					Save
				</button>
				<button
					className={styles.ingredientBtns}
					onClick={() => cancelClickHandler()}
				>
					Cancel
				</button>
			</td>
		</tr>
	);
};

export default EditOnlyRow;
