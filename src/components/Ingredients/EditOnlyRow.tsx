import { useContext } from "react";
import { IngredientModel } from "../../models/recipe";
import { RecipesContext } from "../store/recipes-context";
import styles from "./EditOnlyRow.module.css";

const EditOnlyRow: React.FC<{ ingredient: IngredientModel }> = ({
	ingredient,
}) => {
	const recipesCtx = useContext(RecipesContext);

	const saveHandler = () => {
		recipesCtx.updateIngredient();
	};
	const cancelHandler = () => {
		recipesCtx.cancelUpdate();
	};

	return (
		<>
			<tr key={ingredient.id}>
				<td className={`${styles.ingredient} ${styles.leftColumn}`}>
					{ingredient.id}
				</td>
				<td>
					<input type="number" />
				</td>
				<td>
					<input type="text" />
				</td>
				<td className={styles.ingredientActions}>
					<button className={styles.ingredientBtns} onClick={saveHandler}>
						Save
					</button>
					<button className={styles.ingredientBtns} onClick={cancelHandler}>
						Cancel
					</button>
				</td>
			</tr>
		</>
	);
};

export default EditOnlyRow;
