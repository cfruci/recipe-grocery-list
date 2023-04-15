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
  const headers = { 'content-type': 'application/json' };
  const fetchUrl = 'http://localhost:3000/recipes/' + recipeSlug;
  const formData = await request.formData();

  let requestData;
  if (formData.get('type') === 'addToGroceryList') {
    headers.addToGroceryList = true;
    requestData = {
      $set: { addedToGroceryList: true, 'ingredients.$[].inGroceryList': true },
    };
  } else if (formData.get('type') === 'removeFromGroceryList') {
    headers.addToGroceryList = false;
    requestData = {
      $set: {
        addedToGroceryList: false,
        'ingredients.$[].inGroceryList': false,
      },
    };
  }

  const response = await fetch(fetchUrl, {
    method,
    headers,
    body: JSON.stringify(requestData),
  });
  if (!response.ok) {
    throw json({ message: 'Something did not go right' });
  }
  return redirect('/');
}
