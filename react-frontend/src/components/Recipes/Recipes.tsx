import { useState } from 'react';
import styles from './Recipes.module.css';

import Recipe from './Recipe/Recipe';
import { RecipeModel } from '../../models/recipe';

// COMPONENET BEGINS
const Recipes: React.FC<{ recipes: RecipeModel[] }> = ({ recipes }) => {
  const [cuisine, setCuisine] = useState('All');

  const cuisines = recipes.map((recipe) => recipe.cuisine);

  const onCuisineChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCuisine(event.target.value);
  };

  let filteredRecipes = [];

  if (cuisine !== 'All') {
    filteredRecipes = recipes
      .filter((recipe) => recipe.cuisine === cuisine)
      .map((recipe) => <Recipe key={recipe._id} recipe={recipe} />);
  } else {
    filteredRecipes = recipes.map((recipe) => (
      <Recipe key={recipe._id} recipe={recipe} />
    ));
  }

  return (
    <>
      <label htmlFor="cuisine">Choose cuisine: </label>
      <select id="cuisine" onChange={onCuisineChangeHandler}>
        <option defaultValue={'All'} value="All">
          All
        </option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
      <ul className={styles.recipes}>{filteredRecipes}</ul>
    </>
  );
};

export default Recipes;
