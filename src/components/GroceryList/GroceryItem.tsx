import styles from "./GroceryItem.module.css";
import { IngredientModel } from "../../models/recipe";

const GroceryItem: React.FC<IngredientModel> = ({ groceryItem, onDelete }) => {
	return (
		<li key={groceryItem.id} className={styles.groceryItem}>
			<span>{`${groceryItem.id}: ${groceryItem.quantity}${groceryItem.unit}`}</span>
			<span className={styles.deleteBtn} onClick={deleteIngredientHandler}>
				X
			</span>
		</li>
	);
};

export default GroceryItem;
