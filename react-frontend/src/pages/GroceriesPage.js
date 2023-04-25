import { redirect, useLoaderData, json } from 'react-router-dom';
import GroceryList from '../components/GroceryList/GroceryList';

const GroceriesPage = () => {
  const { groceries } = useLoaderData();

  return <>{<GroceryList groceries={groceries} />}</>;
};

export default GroceriesPage;

export async function loader() {
  const fetchURL =
    process.env.REACT_APP_NODE_ENV === 'development'
      ? `http://${process.env.REACT_APP_API_URL}`
      : `https://${process.env.VERCEL_URL}`;

  const response = await fetch(`${fetchURL}/groceries`);
  if (!response) {
    throw new Error('something went wrong');
  } else {
    const groceries = await response.json();
    return groceries;
  }
}

export async function action({ request }) {
  const method = request.method;
  const formData = await request.formData();
  const headers = {
    'content-type': 'application/json',
  };
  const fetchURL =
    process.env.REACT_APP_NODE_ENV === 'development'
      ? `http://${process.env.REACT_APP_API_URL}`
      : `https://${process.env.VERCEL_URL}`;

  let requestData = {};

  if (formData.get('type') === 'clearList') {
    headers.action = 'clearList';
    const response = await fetch(`${fetchURL}/groceries`, {
      method,
      headers,
    });
    if (!response.ok) {
      throw json({ message: 'could not clear the entire list' });
    }
    return redirect('/');
  } else {
    requestData.ingredient = formData.get('name');
    const response = await fetch(`${fetchURL}/groceries`, {
      method,
      headers,
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw json({ message: 'could not delete ingredient' });
    }
    return redirect('/groceries');
  }
}
