import { useLoaderData } from 'react-router-dom';
import GroceryList from '../components/GroceryList/GroceryList';

const GroceriesPage = () => {
  const { groceries } = useLoaderData();

  return <>{<GroceryList groceries={groceries} />}</>;
};

export default GroceriesPage;

export async function loader() {
  const response = await fetch('http://localhost:3000/groceries', {});
  if (!response) {
    throw new Error('something went wrong');
  } else {
    const groceries = await response.json();
    return groceries;
  }
}

export async function action({ params, request }) {
  const method = request.method;
  const formData = await request.formData();
  const headers = {
    'content-type': 'application/json',
  };

  let requestData;
  if (formData.get('type') === 'clearList') {
    headers.action = 'clearList';
    requestData = {
      'ingredients.inGroceryList': true,
    };
  } else if (formData.get('type') === 'deleteIngredient') {
    headers.action = 'deleteIngredient';
  }
  fetch('http://localhost:3000/groceries', {
    method,
    headers,
    body: JSON.stringify(requestData),
  });
}
