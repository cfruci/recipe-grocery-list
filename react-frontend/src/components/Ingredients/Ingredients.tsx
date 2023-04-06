import { useContext, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Ingredients.module.css";

import { RecipesContext } from "../store/recipes-context";
import { IngredientModel } from "../../models/recipe";
import ReadOnlyRow from "./ReadOnlyRow";
import EditOnlyRow from "./EditOnlyRow";

const Ingredients: React.FC = () => {
	const recipesCtx = useContext(RecipesContext);
	const params = useParams();
	const newIngredientName = useRef<HTMLInputElement>(null);
	const newIngredientQuantity = useRef<HTMLInputElement>(null);
	const newIngredientUnit = useRef<HTMLInputElement>(null);

	const [editIngredientId, setEditIngredientId] = useState<string | null>(null);
	const [editFormData, setEditFormData] = useState<IngredientModel>({
		id: "",
		type: "",
		quantity: 0,
		unit: "",
	});

	const navigate = useNavigate();

	const onNavigateHandler = () => {
		navigate("/recipes");
	};

	const [currentRecipe] = recipesCtx.recipes.filter(
		(recipe) => recipe.id === params.recipeId
	);

	const editClickHandler = (ingredient: IngredientModel) => {
		setEditIngredientId(ingredient.id);

		const editFormData = {
			id: ingredient.id,
			type: ingredient.type,
			quantity: ingredient.quantity,
			unit: ingredient.unit,
		};

		setEditFormData(editFormData);
	};

	const onEditQuantityChangeHandler = (
		ingredient: IngredientModel,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const editingIngredient = {
			...ingredient,
			quantity: parseInt(event.currentTarget.value!),
		};
		setEditFormData(editingIngredient);
	};

	const onEditUnitChangeHandler = (
		ingredient: IngredientModel,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const editingIngredient = {
			...ingredient,
			unit: event.currentTarget.value!,
		};
		setEditFormData(editingIngredient);
	};

	const deleteClickHandler = (ingredient: string) => {
		recipesCtx.deleteIngredientFromRecipe(ingredient, currentRecipe.id);
	};

	const cancelClickHandler = () => {
		setEditIngredientId(null);
	};

	const saveClickHandler = (event: React.FormEvent) => {
		const updatedIngredient = {
			id: editFormData.id,
			type: editFormData.type,
			quantity: editFormData.quantity,
			unit: editFormData.unit,
		};
		event.preventDefault();
		recipesCtx.updateIngredient(updatedIngredient, currentRecipe);
		setEditIngredientId(null);
	};

	const addIngredientHandler = (event: React.FormEvent): void => {
		event.preventDefault();

		const newIngredient: IngredientModel = {
			id: newIngredientName.current!.value,
			type: newIngredientName.current!.value,
			quantity: parseInt(newIngredientQuantity.current!.value),
			unit: newIngredientUnit.current!.value,
		};
		if (currentRecipe?.id) {
			recipesCtx.addIngredientToRecipe(newIngredient, currentRecipe.id);
		}
	};

	return (
		<section className={styles.ingredients}>
			<form action="">
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
						{currentRecipe.ingredients.map((ingredient) => {
							return editIngredientId === ingredient.id ? (
								<EditOnlyRow
									key={ingredient.id}
									ingredient={ingredient}
									cancelClickHandler={cancelClickHandler}
									saveClickHandler={saveClickHandler}
									editFormData={editFormData}
									onEditQuantityChangeHandler={onEditQuantityChangeHandler}
									onEditUnitChangeHandler={onEditUnitChangeHandler}
								/>
							) : (
								<ReadOnlyRow
									key={ingredient.id}
									ingredient={ingredient}
									recipeId={currentRecipe.id}
									editClickHandler={editClickHandler}
									deleteClickHandler={deleteClickHandler}
								/>
							);
						})}
					</tbody>
				</table>
			</form>
			<h3>Add New Ingredient</h3>
			<form
				onSubmit={(event: React.FormEvent) => addIngredientHandler(event)}
				className={styles.newIngredient}
			>
				<input
					type="text"
					placeholder="Enter ingredient name..."
					ref={newIngredientName}
				/>
				<input
					type="number"
					placeholder="Enter quantity..."
					min={0}
					ref={newIngredientQuantity}
				/>
				<input
					type="text"
					placeholder="Enter unit... (e.g., lb, tsp)"
					ref={newIngredientUnit}
				/>
				<button className={styles.ingredientBtns}>Add Ingredient</button>
			</form>
			<br />
			<button onClick={onNavigateHandler}>Back to All Recipes</button>
		</section>
	);
};

export default Ingredients;