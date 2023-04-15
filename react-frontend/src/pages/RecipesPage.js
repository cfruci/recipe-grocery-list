import { json, redirect, useLoaderData } from 'react-router-dom';
import Recipes from '../components/Recipes/Recipes';
import NewRecipe from '../components/NewRecipe/NewRecipe';

const RecipesPage = () => {
  const { recipes } = useLoaderData();

  return (
    <section>
      <Recipes recipes={recipes} />
      <NewRecipe />
    </section>
  );
};

export default RecipesPage;

export async function loader() {
  const response = await fetch('http://localhost:3000/recipes');
  if (!response) {
    throw new Error('no data came from the back end');
  } else {
    const resdata = await response.json();
    return resdata;
  }
}

export async function action({ request }) {
  const data = await request.formData();
  const newRecipe = {
    recipeName: data.get('recipeName'),
    cuisine: data.get('cuisine'),
  };
  const response = await fetch('http://localhost:3000/recipes', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });
  if (!response.ok) {
    throw json({ message: 'New recipe could not be added' });
  }
  return redirect('/');
}
