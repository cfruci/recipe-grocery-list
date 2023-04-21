import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// page imports
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage, {
  loader as recipesLoader,
  action as newRecipeSubmit,
} from './pages/HomePage';
import RecipePage, {
  loader as recipeLoader,
  action as recipeEdit,
} from './pages/RecipePage';
import GroceriesPage, {
  loader as groceriesLoader,
  action as deleteGroceries,
} from './pages/GroceriesPage';

import { AuthContextProvider } from './components/store/auth-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: recipesLoader,
        action: newRecipeSubmit,
      },
      {
        path: '/recipes/:recipeSlug',
        element: <RecipePage />,
        loader: recipeLoader,
        action: recipeEdit,
      },
      {
        path: '/groceries',
        element: <GroceriesPage />,
        loader: groceriesLoader,
        action: deleteGroceries,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
