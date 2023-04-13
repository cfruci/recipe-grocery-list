import Recipes from '../components/Recipes/Recipes';
import NewRecipe from '../components/NewRecipe/NewRecipe';

const HomePage: React.FC = () => {
  return (
    <>
      <Recipes />
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
    const { data } = await response.json();
    return data;
  }
}
