import { useNavigate, useSubmit } from 'react-router-dom';

import { RecipeModel } from '../../../models/recipe';

import styles from './RecipeCard.module.css';

// COMPONENET BEGINS
const RecipeCard: React.FC<{
  recipe: RecipeModel;
}> = ({ recipe }) => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const editRecipeHandler = () => {
    navigate(`/recipes/${recipe.slug}`);
  };

  const addToGroceryListHandler = () => {
    submit(
      { type: 'addToGroceryList', recipeSlug: recipe.slug! },
      { method: 'PATCH' }
    );
  };

  const removeFromGroceryListHandler = () => {
    submit(
      { type: 'removeFromGroceryList', recipeSlug: recipe.slug! },
      { method: 'PATCH' }
    );
  };

  const deleteRecipeHandler = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      submit({ recipeSlug: recipe.slug! }, { method: 'DELETE' });
    }
  };

  return (
    <div className={styles.recipe}>
      <h2>{recipe.recipeName}</h2>
      <button className={styles.btn} onClick={editRecipeHandler}>
        Edit Recipe
      </button>
      <button className={styles.btn} onClick={deleteRecipeHandler}>
        Delete Recipe
      </button>
      {!recipe.addedToGroceryList ? (
        <button
          className={styles.btn}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            addToGroceryListHandler()
          }
        >
          Add to Grocery List
        </button>
      ) : (
        <button
          className={styles.btn}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            removeFromGroceryListHandler()
          }
        >
          Remove from Grocery List
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
