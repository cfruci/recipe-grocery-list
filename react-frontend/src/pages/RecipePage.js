import { redirect, useLoaderData, json } from 'react-router-dom';

import Ingredients from '../components/Ingredients/Ingredients';

const RecipePage = () => {
  const { recipe } = useLoaderData();

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

  if (!response.ok) {
    throw json({ message: 'unable to fetch recipe' });
  } else {
    const recipeData = await response.json();
    return recipeData;
  }
}

export async function action({ request, params }) {
  const method = request.method;
  const recipeSlug = params.recipeSlug;
  const formData = await request.formData();
  const headers = { 'content-type': 'application/json' };
  const fetchUrl = 'http://localhost:3000/recipes/' + recipeSlug;

  // update ingredient
  if (formData.get('updateIngredient') === 'updateIngredient') {
    headers.action = 'updateingredient';

    const updatedIngredient = {
      id: formData.get('ingredientId'),
      name: formData.get('newName'),
      type: formData.get('newType'),
      quantity: parseInt(formData.get('newQuantity')),
      unit: formData.get('newUnit'),
    };

    const response = await fetch(fetchUrl, {
      method,
      headers,
      body: JSON.stringify(updatedIngredient),
    });
    if (!response.ok) {
      throw json({ message: 'could not update ingredient' });
    }
    return redirect('/recipes/' + recipeSlug);
  }

  // delete ingredient
  if (formData.get('action') === 'deleteIngredient') {
    headers.action = 'deleteingredient';
    const id = formData.get('ingredient');

    const response = await fetch(fetchUrl, {
      method,
      headers,
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw json({ message: 'could not delete ingredient' });
    }
    return redirect('/recipes/' + recipeSlug);
  }

  if (formData.get('addIngredient') === 'addIngredient') {
    const newIngredient = {
      ingredientName: formData.get('ingredientName'),
      type: formData.get('type'),
      quantity: parseInt(formData.get('quantity')),
      unit: formData.get('unit'),
    };

    headers.action = 'addingredient';

    const response = await fetch(fetchUrl, {
      method,
      headers,
      body: JSON.stringify(newIngredient),
    });
    if (!response.ok) {
      throw json({ message: 'could not add ingredient' });
    }
    return redirect('/recipes/' + recipeSlug);
  }
}
