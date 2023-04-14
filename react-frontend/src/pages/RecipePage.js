import { useLoaderData } from 'react-router-dom';

import Ingredients from '../components/Ingredients/Ingredients';

const RecipePage = () => {
  const { data } = useLoaderData();
  const recipe = data[0];

  return (
    <>
      <h2>{recipe.recipeName}</h2>
      <Ingredients ingredients={recipe.ingredients} />
    </>
  );
};

export default RecipePage;

export async function loader({ params }) {
  const { recipeSlug } = params;
  const response = await fetch(`http://localhost:3000/recipes/${recipeSlug}`);

  if (!response) {
    // handle error
  } else {
    const recipeData = await response.json();
    return recipeData;
  }
}
