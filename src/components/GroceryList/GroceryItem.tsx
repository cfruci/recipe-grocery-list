import { IngredientModel } from "../../models/recipe";
import styles from "./GroceryItem.module.css";

const GroceryItem: React.FC<{
	grocery: IngredientModel;
	onDelete: (groceryItem: IngredientModel) => void;
}> = ({ grocery, onDelete }) => {
	return (
		<li className={styles.grocery}>
			<span>{`${grocery.id}: ${grocery.quantity}${grocery.unit}`}</span>
			<span className={styles.deleteBtn} onClick={() => onDelete(grocery)}>
				X
			</span>
		</li>
	);
};

export default GroceryItem;
