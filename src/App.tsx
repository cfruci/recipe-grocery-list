import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import GroceryListPage from "./pages/GroceryListPage";
import NewRecipePage from "./pages/NewRecipePage";

import { RecipesContextProvider } from "./components/store/recipes-context";
import RecipePage from "./pages/RecipePage";
import { GroceriesContextProvider } from "./components/store/groceries-context";
import { AuthContextProvider } from "./components/store/auth-context";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "/recipes",
				element: <RecipesPage />,
			},
			{ path: "/recipes/:recipeId", element: <RecipePage /> },
			{ path: "/grocery-list", element: <GroceryListPage /> },
			{ path: "/add-new-recipe", element: <NewRecipePage /> },
		],
	},
]);

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
