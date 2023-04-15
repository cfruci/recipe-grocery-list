import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// page imports
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import RecipesPage, {
  loader as recipesLoader,
  action as newRecipeSubmit,
} from './pages/RecipesPage';
import RecipePage, {
  loader as recipeLoader,
  action as recipeEdit,
} from './pages/RecipePage';
import GroceriesPage, {
  loader as groceriesLoader,
  action as clearList,
} from './pages/GroceriesPage';

// context imports
import { RecipesContextProvider } from './components/store/recipes-context';
import { AuthContextProvider } from './components/store/auth-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
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
        action: clearList,
      },
    ],
  },
]);

// COMPONENET BEGINS
const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <RecipesContextProvider>
        <RouterProvider router={router} />
      </RecipesContextProvider>
    </AuthContextProvider>
  );
};

export default App;
