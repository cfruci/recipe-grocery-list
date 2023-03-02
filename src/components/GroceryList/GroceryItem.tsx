import { useContext } from "react";
import { IngredientModel } from "../../models/recipe";
import { GroceriesContext } from "../store/groceries-context";
import styles from "./GroceryItem.module.css";

const GroceryItem: React.FC<{
	grocery: IngredientModel;
}> = ({ grocery }) => {
	const groceriesCtx = useContext(GroceriesContext);

	return (
		<li className={styles.grocery}>
			<span>{`${grocery.id}: ${grocery.quantity} ${grocery.unit}`}</span>
			<span
				className={styles.deleteBtn}
				onClick={() => {
					return groceriesCtx.deleteIngredient(grocery);
				}}
			>
				X
			</span>
		</li>
	);
};

export default GroceryItem;
