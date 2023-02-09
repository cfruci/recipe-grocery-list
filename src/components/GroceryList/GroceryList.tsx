import { useContext } from "react";

import styles from "./GroceryList.module.css";
import { RecipesContext } from "../store/recipes-context";

const GroceryList: React.FC = () => {
	const ctx = useContext(RecipesContext);

	return (
		<ul className={styles.groceries}>
			{ctx.groceryList.map((groceryItem) => (
				<li
					key={groceryItem.id}
				>{`${groceryItem.id}: ${groceryItem.quantity}`}</li>
			))}
		</ul>
	);
};

export default GroceryList;
