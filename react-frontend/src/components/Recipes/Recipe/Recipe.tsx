import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RecipeModel } from '../../../models/recipe';
import styles from './Recipe.module.css';
import { RecipesContext } from '../../store/recipes-context';

// COMPONENET BEGINS
const Recipe: React.FC<{ recipe: RecipeModel }> = ({ recipe }) => {
  const recipesCtx = useContext(RecipesContext);
  const [addedToGroceryList, setAddedToGroceryList] = useState(false);
  const navigate = useNavigate();

  const addToGroceryList = (event: any): void => {
    event.stopPropagation();
    const ingredients = recipe.ingredients;
    recipesCtx.addRecipeToGroceryList(ingredients);
    setAddedToGroceryList(true);
  };

  const removeFromGroceryList = (event: any): void => {
    event.stopPropagation();
    setAddedToGroceryList(false);
  };

  const seeRecipeHandler = (event: any) => {
    navigate('/recipes/' + recipe._id);
  };

  return (
    <div className={styles.recipe} onClick={seeRecipeHandler}>
      <h2>{recipe._id}</h2>
      {!addedToGroceryList ? (
        <button onClick={addToGroceryList} className={styles.addBtn}>
          Add to Grocery List
        </button>
      ) : (
        <button onClick={removeFromGroceryList} className={styles.removeBtn}>
          Remove from Grocery List
        </button>
      )}
    </div>
  );
};

export default Recipe;
