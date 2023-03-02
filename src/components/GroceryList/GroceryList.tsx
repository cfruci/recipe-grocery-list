import { useContext } from "react";

import styles from "./GroceryList.module.css";
import { GroceriesContext } from "../store/groceries-context";
import GroceryItem from "./GroceryItem";

const GroceryList: React.FC = () => {
	const groceriesCtx = useContext(GroceriesContext);

	const onClickHandler = () => {
		console.log("list texted");
	};

	const meats = groceriesCtx.groceries
		.filter((grocery) => grocery.type === "Meat")
		.map((grocery) => <GroceryItem key={grocery.id} grocery={grocery} />);

	const produce = groceriesCtx.groceries
		.filter((grocery) => grocery.type === "Produce")
		.map((grocery) => <GroceryItem key={grocery.id} grocery={grocery} />);

	const dairy = groceriesCtx.groceries
		.filter((grocery) => grocery.type === "Dairy")
		.map((grocery) => <GroceryItem key={grocery.id} grocery={grocery} />);

	const pantry = groceriesCtx.groceries
		.filter((grocery) => grocery.type === "Pantry")
		.map((grocery) => <GroceryItem key={grocery.id} grocery={grocery} />);

	return (
		<>
			<ul className={styles.groceries}>
				{meats.length > 0 ? (
					<>
						<h3>Meats</h3>
						{meats}
						<hr />
					</>
				) : (
					""
				)}
				{produce.length > 0 ? (
					<>
						<h3>Produce</h3>
						{produce}
						<hr />
					</>
				) : (
					""
				)}

				{dairy.length > 0 ? (
					<>
						<h3>Dairy</h3>
						{dairy}
						<hr />
					</>
				) : (
					""
				)}
				{pantry.length > 0 ? (
					<>
						<h3>Pantry</h3>
						{pantry}
						<hr />
					</>
				) : (
					""
				)}
			</ul>
			<button onClick={onClickHandler}>Text Me My List</button>
		</>
	);
};

export default GroceryList;
