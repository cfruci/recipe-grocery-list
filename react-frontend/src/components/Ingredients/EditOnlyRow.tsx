import styles from "./EditOnlyRow.module.css";

import { IngredientModel } from "../../models/recipe";

const EditOnlyRow: React.FC<{
	ingredient: IngredientModel;
	cancelClickHandler: () => void;
	saveClickHandler: (event: React.FormEvent) => void;
	editFormData: IngredientModel;
	onEditQuantityChangeHandler: (
		ingredient: IngredientModel,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	onEditUnitChangeHandler: (
		ingredient: IngredientModel,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}> = ({
	ingredient,
	cancelClickHandler,
	saveClickHandler,
	editFormData,
	onEditQuantityChangeHandler,
	onEditUnitChangeHandler,
}) => {
	return (
		<tr key={ingredient.id}>
			<td className={styles.leftColumn}>{ingredient.id}</td>
			<td>
				<input
					type="number"
					name="quantity"
					min={0}
					value={editFormData.quantity}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						onEditQuantityChangeHandler(ingredient, event)
					}
				/>
			</td>
			<td>
				<input
					type="text"
					name="unit"
					value={editFormData.unit}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						onEditUnitChangeHandler(ingredient, event)
					}
				/>
			</td>
			<td className={styles.ingredientActions}>
				<button
					className={styles.ingredientBtns}
					onClick={(event: React.FormEvent) => saveClickHandler(event)}
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
