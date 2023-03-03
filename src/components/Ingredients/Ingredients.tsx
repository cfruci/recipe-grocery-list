import { useContext, useState } from "react";
import styles from "./Ingredients.module.css";
import { RecipesContext } from "../store/recipes-context";
import { useParams } from "react-router-dom";

// typescript types

type currentIngredient = {
	id: string;
	currentIngredientQuantity: number;
	currentIngredientUnit: string;
};

type newIngredient = {
	id: string;
	newIngredientQuantity: number;
	newIngredientUnit: string;
};

// FC begins
const Ingredients: React.FC = () => {
	const ctx = useContext(RecipesContext);
	const params = useParams();

	const currentRecipe = ctx.recipes.filter(
		(recipe) => recipe.id === params.recipeId
	)[0];

	// sets Editing mode
	const [inEditMode, setInEditMode] = useState<{
		isEditing: boolean;
		rowKey: null | string;
	}>({
		isEditing: false,
		rowKey: null,
	});

	// state for what is currently being edited
	const [currentIngredientQuantity, setIngredientQuantity] =
		useState<number>(0);
	const [currentIngredientUnit, setIngredientUnit] = useState<string>("");
	const [addNewRow, setAddNewRow] = useState<boolean>(false);
	const [currentIngredientName, setIngredientName] = useState<string>("");

	// handlers

	const onEdit = ({
		id,
		currentIngredientQuantity,
		currentIngredientUnit,
	}: currentIngredient): void => {
		setInEditMode({ isEditing: true, rowKey: id });
		setIngredientQuantity(currentIngredientQuantity);
		setIngredientUnit(currentIngredientUnit);
	};

	const onCancel = () => {
		setInEditMode({ isEditing: false, rowKey: null });
		setIngredientQuantity(0);
		setIngredientUnit("");
	};

	const onSave = ({
		id,
		newIngredientQuantity,
		newIngredientUnit,
	}: newIngredient) => {
		console.log(currentRecipe.ingredients);
		// if (currentRecipe.ingredients.includes(currentIngredientName)) {
		// 	updateIngredient({ id, newIngredientQuantity, newIngredientUnit });
		// } else
		// 	currentRecipe.ingredients.push({
		// 		id,
		// 		// Quantity: newIngredientQuantity,
		// 		Unit: newIngredientUnit,
		// 	});
	};

	const onDelete = (id: string): void => {
		currentRecipe.ingredients = currentRecipe.ingredients.filter(
			(ingredient) => ingredient.id !== id
		);
		setInEditMode({ isEditing: false, rowKey: null });
		setIngredientQuantity(0);
		setIngredientUnit("");
	};

	// const updateIngredient = ({
	// 	id,
	// 	newIngredientQuantity,
	// 	newIngredientUnit,
	// }: newIngredient) => {
	// 	currentRecipe.ingredients.map((ingredient) => {
	// 		if (ingredient.id === id) {
	// 			ingredient.quantity = newIngredientQuantity;
	// 			ingredient.unit = newIngredientUnit;
	// 		}
	// 	});
	// 	setInEditMode({ isEditing: false, rowKey: null });
	// 	setIngredientQuantity(0);
	// 	setIngredientUnit("");
	// };

	const addIngredientHandler = () => {
		setInEditMode({ isEditing: true, rowKey: null });
		setAddNewRow(true);
	};

	return (
		<section className={styles.ingredients}>
			<table className={styles.ingredientTable}>
				<thead className={styles.thead}>
					<tr>
						<th className={styles.ingredientRow}>Ingredient</th>
						<th>Quantity</th>
						<th>Unit</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentRecipe.ingredients.map((ingredient) => (
						<tr key={ingredient.id}>
							<td className={styles.ingredient}>{ingredient.id}</td>
							{inEditMode.isEditing && inEditMode.rowKey === ingredient.id ? (
								<td>
									<input
										type="number"
										value={currentIngredientQuantity}
										onChange={(event) =>
											setIngredientQuantity(event.target.valueAsNumber)
										}
									/>
								</td>
							) : (
								<td>{ingredient.quantity}</td>
							)}
							{inEditMode.isEditing && inEditMode.rowKey === ingredient.id ? (
								<td>
									<input
										type="text"
										value={currentIngredientUnit}
										onChange={(event) => setIngredientUnit(event.target.value)}
									/>
								</td>
							) : (
								<td>{ingredient.unit}</td>
							)}
							{inEditMode.isEditing && inEditMode.rowKey === ingredient.id ? (
								<td className={styles.ingredientActions}>
									<button
										className={styles.ingredientBtns}
										onClick={() =>
											onSave({
												id: ingredient.id,
												newIngredientQuantity: currentIngredientQuantity,
												newIngredientUnit: currentIngredientUnit,
											})
										}
									>
										Save
									</button>
									<button onClick={onCancel} className={styles.ingredientBtns}>
										Cancel
									</button>
								</td>
							) : (
								<td className={styles.actions}>
									<button
										className={styles.ingredientBtns}
										onClick={() =>
											onEdit({
												id: ingredient.id,
												currentIngredientQuantity: ingredient.quantity,
												currentIngredientUnit: ingredient.unit,
											})
										}
									>
										Edit
									</button>
									<button
										className={styles.ingredientBtns}
										onClick={() => onDelete(ingredient.id)}
									>
										Delete
									</button>
								</td>
							)}
						</tr>
					))}
					{inEditMode.isEditing && addNewRow && (
						<tr>
							<td>
								<input
									type="text"
									placeholder="Ingredient Name"
									onChange={(event) => setIngredientName(event.target.value)}
								/>
							</td>
							<td>
								<input
									type="number"
									placeholder="0"
									onChange={(event) =>
										setIngredientQuantity(event.target.valueAsNumber)
									}
								/>
							</td>
							<td>
								<input
									type="text"
									placeholder=""
									onChange={(event) => setIngredientUnit(event.target.value)}
								/>
							</td>
							<td>
								<button
									className={styles.ingredientBtns}
									onClick={() =>
										onSave({
											id: currentIngredientName,
											newIngredientQuantity: currentIngredientQuantity,
											newIngredientUnit: currentIngredientUnit,
										})
									}
								>
									Save
								</button>
								<button className={styles.ingredientBtns} onClick={onCancel}>
									Cancel
								</button>
							</td>
						</tr>
					)}
					<tr>
						<td>
							<button
								className={styles.ingredientBtns}
								onClick={addIngredientHandler}
								disabled={inEditMode.isEditing}
							>
								Add Ingredient
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default Ingredients;
