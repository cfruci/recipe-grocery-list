import { useLoaderData } from 'react-router-dom';
import Recipes from '../components/Recipes/Recipes';
import NewRecipe from '../components/NewRecipe/NewRecipe';

const HomePage = () => {
  const { recipes } = useLoaderData();

  return (
    <>
      <Recipes recipes={recipes} />
      <NewRecipe />
    </>
  );
};

export default HomePage;

export async function loader() {
  const response = await fetch('http://localhost:3000/recipes');
  if (!response) {
    throw new Error('no data came from the back end');
  } else {
    const resdata = await response.json();
    return resdata;
  }
}
