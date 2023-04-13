import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// page imports
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as recipesLoader } from './pages/HomePage';
import GroceryListPage from './pages/GroceryListPage';
import RecipePage from './pages/RecipePage';

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
      { path: '/recipes/:recipeId', element: <RecipePage /> },
      { path: '/grocery-list', element: <GroceryListPage /> },
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
