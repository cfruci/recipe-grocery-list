import { useLoaderData } from 'react-router-dom';
import GroceryList from '../components/GroceryList/GroceryList';

const GroceriesPage = () => {
  const { groceries } = useLoaderData();

  return (
    <>
      <GroceryList groceries={groceries} />
    </>
  );
};

export default GroceriesPage;

export async function loader() {
  const response = await fetch('http://localhost:3000/groceries');
  if (!response) {
    throw new Error('something went wrong');
  } else {
    const groceries = await response.json();
    return groceries;
  }
}
