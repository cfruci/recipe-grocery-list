import { useContext, useRef, useState } from "react";
import styles from "./Ingredients.module.css";
import { RecipesContext } from "../store/recipes-context";
import { useParams } from "react-router-dom";
import { IngredientModel } from "../../models/recipe";
import ReadOnlyRow from "./ReadOnlyRow";
import EditOnlyRow from "./EditOnlyRow";

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

const Ingredients: React.FC = () => {
	const recipesCtx = useContext(RecipesContext);
	const params = useParams();

	const currentRecipe = recipesCtx.recipes.filter(
		(recipe) => recipe.id === params.recipeId
	)[0];

	const [currentIngredientQuantity, setIngredientQuantity] =
		useState<number>(0);
	const [currentIngredientUnit, setIngredientUnit] = useState<string>("");
	const [currentIngredientName, setIngredientName] = useState<string>("");

	const newIngredientName = useRef<HTMLInputElement>(null);
	const newIngredientQuantity = useRef<HTMLInputElement>(null);
	const newIngredientUnit = useRef<HTMLInputElement>(null);

	// sets Editing mode
	const [inEditMode, setInEditMode] = useState<{
		isEditing: boolean;
		rowKey: null | string;
	}>({
		isEditing: false,
		rowKey: null,
	});

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

	const addIngredientHandler = (event: React.FormEvent): void => {
		event.preventDefault();

		const newIngredient: IngredientModel = {
			id: newIngredientName.current!.value,
			type: newIngredientName.current!.value,
			quantity: parseInt(newIngredientQuantity.current!.value),
			unit: newIngredientUnit.current!.value,
		};
		recipesCtx.addIngredientToRecipe(newIngredient, currentRecipe.id);
	};

	return (
		<section className={styles.ingredients}>
			<table className={styles.ingredientTable}>
				<thead className={styles.thead}>
					<tr>
						<th className={styles.leftColumn}>Ingredient</th>
						<th>Quantity</th>
						<th>Unit</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentRecipe.ingredients.map((ingredient) => (
						// <EditOnlyRow ingredient={ingredient}/>
						// <ReadOnlyRow ingredient={ingredient}/>
						<tr key={ingredient.id}>
							<td className={`${styles.ingredient} ${styles.leftColumn}`}>
								{ingredient.id}
							</td>
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
					{inEditMode.isEditing && (
						<tr>
							<td>
								<input
									type="text"
									placeholder="Ingredient"
									onChange={(event) => setIngredientName(event.target.value)}
								/>
							</td>
							<td>
								<input
									type="number"
									placeholder="1"
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
				</tbody>
			</table>
			<h3>Add New Ingredient</h3>
			<form
				onSubmit={(event: React.FormEvent) => addIngredientHandler(event)}
				className={styles.newIngredient}
			>
				<input type="text" placeholder="Ingredient" ref={newIngredientName} />
				<input
					type="number"
					placeholder="Quantity"
					defaultValue={0}
					min={0}
					ref={newIngredientQuantity}
				/>
				<input type="text" placeholder="Unit" ref={newIngredientUnit} />

				<button className={styles.ingredientBtns}>Add Ingredient</button>
			</form>
		</section>
	);
};

export default Ingredients;
