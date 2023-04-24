import { useRef } from 'react';
import { useSubmit } from 'react-router-dom';

import styles from './NewRecipe.module.css';

const NewRecipe: React.FC = () => {
  const submit = useSubmit();
  const recipeNameRef = useRef<HTMLInputElement>(null);
  const recipeCuisineRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    submit(
      {
        action: 'newRecipe',
        recipeName: recipeNameRef.current!.value,
        cuisine: recipeCuisineRef.current!.value,
      },
      { method: 'POST' }
    );

    recipeNameRef.current!.value = '';
    recipeCuisineRef.current!.value = '';
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2>Start New Recipe</h2>
        <div className={styles.descriptors}>
          <div className={styles.control}>
            <label htmlFor="recipe-name">Name:</label>
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
      </form>
    </>
  );
};

export default NewRecipe;
