import { json, redirect, useLoaderData } from 'react-router-dom';
import RecipesCards from '../components/Recipes/RecipesCards';
import NewRecipe from '../components/NewRecipe/NewRecipe';

const HomePage = () => {
  const { recipes } = useLoaderData();

  return (
    <section>
      <RecipesCards recipes={recipes} />
      <NewRecipe />
    </section>
  );
};

export default HomePage;

export async function loader() {
  const fetchURL =
    process.env.REACT_APP_NODE_ENV === 'development'
      ? `http://${process.env.REACT_APP_LOCAL_URL}`
      : 'https://recipe-grocery-list-api.herokuapp.com/api';

  const response = await fetch(`${fetchURL}/recipes`);
  if (!response) {
    throw new Error('no data came from the back end');
  } else {
    const resdata = await response.json();
    return resdata;
  }
}

export async function action({ request }) {
  const method = request.method;
  const headers = { 'content-type': 'application/json' };
  const formData = await request.formData();
  const recipeSlug = formData.get('recipeSlug');
  const fetchURL =
    process.env.REACT_APP_NODE_ENV === 'development'
      ? `http://${process.env.REACT_APP_LOCAL_URL}`
      : 'https://recipe-grocery-list-api.herokuapp.com/api';

  if (formData.get('action') === 'newRecipe') {
    const newRecipe = {
      recipeName: formData.get('recipeName'),
      cuisine: formData.get('cuisine').toLowerCase(),
    };

    const response = await fetch(`${fetchURL}/recipes`, {
      method,
      headers,
      body: JSON.stringify(newRecipe),
    });
    if (!response.ok) {
      throw json({ message: 'New recipe could not be added' });
    }
    return redirect('/');
  }

  if (method === 'PATCH') {
    let requestData;

    if (formData.get('type') === 'addToGroceryList') {
      headers.action = 'addtogrocerylist';
      requestData = {
        $set: {
          addedToGroceryList: true,
          'ingredients.$[].inGroceryList': true,
        },
      };
    } else if (formData.get('type') === 'removeFromGroceryList') {
      headers.action = 'removefromgrocerylist';
      requestData = {
        $set: {
          addedToGroceryList: false,
          'ingredients.$[].inGroceryList': false,
        },
      };
    }

    const response = await fetch(`${fetchURL}/recipes/${recipeSlug}`, {
      method,
      headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw json({ message: 'Something did not go right' });
    }
    return redirect('/');
  }

  if (method === 'DELETE') {
    const response = await fetch(`${fetchURL}/recipes/${recipeSlug}`, {
      method,
      headers,
    });
    if (!response.ok) {
      throw json({ message: 'Something did not go right' });
    }
    return redirect('/');
  }
}
