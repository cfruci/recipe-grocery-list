import { useContext, useRef, useState } from 'react';

import { IngredientModel, RecipeModel } from '../../models/recipe';
import { RecipesContext } from '../store/recipes-context';
import styles from './NewRecipe.module.css';

// COMPONENET BEGINS
const NewRecipe: React.FC = () => {
  const recipesCtx = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);

  const recipeNameRef = useRef<HTMLInputElement>(null);
  const recipeCuisineRef = useRef<HTMLInputElement>(null);
  const recipeDescriptionRef = useRef<HTMLInputElement>(null);
  const ingredientInputRef = useRef<HTMLInputElement>(null);
  const ingredientTypeRef = useRef<HTMLSelectElement>(null);
  const ingredientQuantityRef = useRef<HTMLInputElement>(null);
  const ingredientUnitRef = useRef<HTMLInputElement>(null);

  const addNewIngredient = (event: React.FormEvent) => {
    event.preventDefault();
    const newIngredient: IngredientModel = {
      ingredientName: ingredientInputRef.current!.value,
      type: ingredientTypeRef.current!.value,
      quantity: parseInt(ingredientQuantityRef.current!.value),
      unit: ingredientUnitRef.current!.value,
    };

    setIngredients((prevIngredient) => prevIngredient.concat(newIngredient));
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newRecipe: RecipeModel = {
      recipeName: recipeNameRef.current!.value,
      cuisine: recipeCuisineRef.current!.value,
      ingredients,
    };
    recipesCtx.addRecipe(newRecipe);
  };

  return (
    <>
      <form
        action=""
        onSubmit={(event: React.FormEvent) => onSubmitHandler(event)}
        className={styles.form}
      >
        <h2>Add New Recipe</h2>
        <div className={styles.descriptors}>
          <div className={styles.control}>
            <label htmlFor="recipe-name">Recipe Name:</label>
            <input type="text" id="recipe-name" ref={recipeNameRef} required />
          </div>
          <div className={styles.control}>
            <label htmlFor="cuisine">Cuisine:</label>
            <input type="text" id="cuisine" ref={recipeCuisineRef} required />
          </div>
        </div>
      </form>
      {/* <form action="">
				<div className="ingredients">
					<h3>Ingredients</h3>
					{ingredients.length > 0
						? ingredients.map((ingredient) => (
								<>
									<div>{ingredient.id}</div>
									<div>{ingredient.quantity}</div>
									<div>{ingredient.unit}</div>
								</>
						  ))
						: null}
					<div className={styles.control}>
						<label htmlFor="new-ingredient">Ingredient:</label>
						<input
							type="text"
							id="new-ingredient"
							placeholder="Ingredient..."
							ref={ingredientInputRef}
							required
						/>
						<select
							id="new-ingredient-type"
							placeholder="Type..."
							ref={ingredientTypeRef}
							required
						>
							<option defaultValue="">Type...</option>
							<option value="Produce">Produce</option>
							<option value="Meat">Meat</option>
							<option value="Pantry">Pantry</option>
							<option value="Dairy">Dairy</option>
						</select>
						<input
							type="text"
							id="new-ingredient-quantity"
							placeholder="Quantity..."
							ref={ingredientQuantityRef}
							required
						/>
						<input
							type="text"
							id="new-ingredient-unit"
							ref={ingredientUnitRef}
							placeholder="Unit (lb, tbsp, etc.)..."
						/>
						<button
							onClick={(event: React.FormEvent) => addNewIngredient(event)}
							className={styles.addIngredientBtn}
						>
							+ Ingredient
						</button>
					</div>
				</div>
			</form>
			<button disabled={false}>Save Recipe</button> */}
    </>
  );
};

export default NewRecipe;
