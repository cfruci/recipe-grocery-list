import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// page imports
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as recipesLoader } from './pages/HomePage';
import RecipePage, { loader as recipeLoader } from './pages/RecipePage';
import GroceriesPage, {
  loader as groceriesLoader,
} from './pages/GroceriesPage';

// context imports
import { RecipesContextProvider } from './components/store/recipes-context';
import { GroceriesContextProvider } from './components/store/groceries-context';
import { AuthContextProvider } from './components/store/auth-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: recipesLoader },
      {
        path: '/recipes/:recipeSlug',
        element: <RecipePage />,
        loader: recipeLoader,
      },
      {
        path: '/groceries',
        element: <GroceriesPage />,
        loader: groceriesLoader,
      },
    ],
  },
]);

// COMPONENET BEGINS
const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <GroceriesContextProvider>
        <RecipesContextProvider>
          <RouterProvider router={router} />
        </RecipesContextProvider>
      </GroceriesContextProvider>
    </AuthContextProvider>
  );
};

export default App;
