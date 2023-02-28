import { useContext } from "react";

import styles from "./GroceryList.module.css";
import { GroceriesContext } from "../store/groceries-context";
import GroceryItem from "./GroceryItem";
import { IngredientModel } from "../../models/recipe";

const GroceryList: React.FC = () => {
	const groceriesCtx = useContext(GroceriesContext);

	const deleteGroceryHandler = (ingredient: IngredientModel): void => {
		groceriesCtx.deleteIngredient(ingredient);
	};

	let groceries = groceriesCtx.groceries.map((grocery) => (
		<GroceryItem
			key={grocery.id}
			onDelete={deleteGroceryHandler}
			grocery={grocery}
		/>
	));

	return (
		<>
			<ul className={styles.groceries}>{groceries}</ul>
		</>
	);
};

export default GroceryList;
