import { useState } from 'react';
import styles from './RecipesCards.module.css';

import RecipeCard from './RecipeCard/RecipeCard';
import { RecipeModel } from '../../models/recipe';

const RecipesCards: React.FC<{ recipes: RecipeModel[] }> = ({ recipes }) => {
  const [cuisine, setCuisine] = useState('All');
  const cuisinesHash: any = {};

  recipes.forEach((recipe) => {
    cuisinesHash[recipe.cuisine] = true;
  });

  const cuisines = Object.keys(cuisinesHash);

  const onCuisineChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCuisine(event.target.value);
  };

  let filteredRecipes = [];

  if (cuisine !== 'All') {
    filteredRecipes = recipes
      .filter((recipe) => recipe.cuisine === cuisine)
      .map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />);
  } else {
    filteredRecipes = recipes.map((recipe) => (
      <RecipeCard key={recipe._id} recipe={recipe} />
    ));
  }

  return (
    <>
      <section className={styles.cuisineSelect}>
        <label htmlFor="cuisine">Your cuisines: </label>
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
      </section>
      <ul className={styles.recipes}>{filteredRecipes}</ul>
    </>
  );
};

export default RecipesCards;
