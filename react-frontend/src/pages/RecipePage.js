import { redirect, useLoaderData, json, useNavigate } from 'react-router-dom';

import Ingredients from '../components/Ingredients/Ingredients';
import NewIngredient from '../components/Ingredients/NewIngredient';

const RecipePage = () => {
  const { recipe } = useLoaderData();
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/');
  };

  return (
    <>
      <h2>{recipe.recipeName}</h2>
      <Ingredients ingredients={recipe.ingredients} />
      <button onClick={onClickHandler}>Back to All Recipes</button>
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

  if (formData.get('deleteIngredient') === 'deleteIngredient') {
    headers.action = 'deleteingredient';
    const id = formData.get('ingredientId');

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

  if (formData.get('action') === 'addNewIngredient') {
    const newIngredient = {
      ingredientName: formData.get('newIngredientName'),
      type: formData.get('newIngredientType'),
      quantity: parseInt(formData.get('newIngredientQuantity')),
      unit: formData.get('newIngredientUnit'),
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
}
