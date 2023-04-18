import { useRef } from 'react';
import { Form } from 'react-router-dom';

import styles from './NewRecipe.module.css';

const NewRecipe: React.FC = () => {
  const recipeNameRef = useRef<HTMLInputElement>(null);
  const recipeCuisineRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Form method="post" className={styles.form}>
        <h2>Start New Recipe</h2>
        <div className={styles.descriptors}>
          <div className={styles.control}>
            <label htmlFor="recipe-name">Recipe Name:</label>
            <input
              type="text"
              id="recipe-name"
              name="recipeName"
              ref={recipeNameRef}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="cuisine">Cuisine:</label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              ref={recipeCuisineRef}
              required
            />
          </div>
        </div>
        <button disabled={false} type="submit" className={styles.btn}>
          Add Recipe
        </button>
      </Form>
    </>
  );
};

export default NewRecipe;
