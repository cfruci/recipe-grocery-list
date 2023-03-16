import styles from "./EditOnlyRow.module.css";

import { IngredientModel } from "../../models/recipe";

const EditOnlyRow: React.FC<{
	ingredient: IngredientModel;
	cancelClickHandler: () => void;
	saveClickHandler: () => void;
	editFormData: IngredientModel;
	onEditChangeHandler: (
		ingredient: IngredientModel,
		event: React.FormEvent<HTMLInputElement>
	) => void;
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
					name="quantity"
					value={editFormData.quantity}
					onChange={(event: React.FormEvent<HTMLInputElement>) =>
						onEditChangeHandler(ingredient, event)
					}
				/>
			</td>
			<td>
				<input
					type="text"
					name="unit"
					value={editFormData.unit}
					onChange={(event) => onEditChangeHandler(ingredient, event)}
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
