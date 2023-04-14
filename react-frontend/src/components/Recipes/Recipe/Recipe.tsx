import { useNavigate } from 'react-router-dom';

import { RecipeModel } from '../../../models/recipe';
import styles from './Recipe.module.css';

const toggleGroceryList = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response.json();
};

// COMPONENET BEGINS
const Recipe: React.FC<{ recipe: RecipeModel }> = ({ recipe }) => {
  const navigate = useNavigate();
  const seeRecipeHandler = (event: any) => {
    navigate(`/recipes/${recipe.slug}`);
  };

  const fetchURL = `http://localhost:3000/recipes/${recipe.slug}`;

  const addToGroceryListHandler = (event: any): void => {
    event.stopPropagation();
    const response = toggleGroceryList(fetchURL, { addedToGroceryList: true });

    if (!response) {
      // handle error
    }
  };

  const removeFromGroceryListHandler = (event: any) => {
    event.stopPropation();

    const response = toggleGroceryList(fetchURL, { addedToGroceryList: false });

    if (!response) {
      // handle error
    }
  };

  return (
    <div className={styles.recipe} onClick={seeRecipeHandler}>
      <h2>{recipe.recipeName}</h2>
      {!recipe.addedToGroceryList ? (
        <button className={styles.addBtn} onClick={addToGroceryListHandler}>
          Add to Grocery List
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          onClick={removeFromGroceryListHandler}
        >
          Remove from Grocery List
        </button>
      )}
    </div>
  );
};

export default Recipe;
