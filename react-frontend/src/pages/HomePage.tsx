import NewRecipe from '../components/NewRecipe/NewRecipe';
import Recipes from '../components/Recipes/Recipes';

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
    // ...
  } else {
    const resData = await response.json();
    return resData.data;
  }
}
