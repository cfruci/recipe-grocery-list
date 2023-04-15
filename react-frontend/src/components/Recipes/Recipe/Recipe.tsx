import { useNavigate, useSubmit } from 'react-router-dom';

import { RecipeModel } from '../../../models/recipe';

import styles from './Recipe.module.css';

// COMPONENET BEGINS
const Recipe: React.FC<{
  recipe: RecipeModel;
}> = ({ recipe }) => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const seeRecipeHandler = () => {
    navigate(`/recipes/${recipe.slug}`);
  };

  const addToGroceryListHandler = () => {
    submit(
      { type: 'addToGroceryList' },
      { method: 'patch', action: `/recipes/${recipe.slug}` }
    );
  };

  const removeFromGroceryListHandler = () => {
    submit(
      { type: 'removeFromGroceryList' },
      { method: 'patch', action: `/recipes/${recipe.slug}` }
    );
  };

  const deleteRecipeHandler = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      submit(null, { method: 'delete', action: `/recipes/${recipe.slug}` });
    }
  };

  return (
    <div className={styles.recipe}>
      <h2>{recipe.recipeName}</h2>
      <button className={styles.btn} onClick={seeRecipeHandler}>
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

export default Recipe;
