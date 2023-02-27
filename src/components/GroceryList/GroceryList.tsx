import { useContext } from "react";

import styles from "./GroceryList.module.css";
import { GroceriesContext } from "../store/groceries-context";

import GroceryItem from "./GroceryItem";

const GroceryList: React.FC = () => {
	const groceriesCtx = useContext(GroceriesContext);

	const deleteIngredientHandler = (event: any): void => {
		groceriesCtx.deleteIngredient(event.target);
	};

	const groceryItems = (
		<ul className={styles.groceries}>
			{groceriesCtx.groceryList.map((groceryItem) => (
				<GroceryItem
					key={groceryItem.id}
					groceryItem={groceryItem}
					onDelete={deleteIngredientHandler}
				/>
			))}
		</ul>
	);

	return { groceryItems };
};

export default GroceryList;
