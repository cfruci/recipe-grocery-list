import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";
import GroceryListPage from "./pages/GroceryListPage";
import NewRecipePage from "./pages/NewRecipePage";
import { RecipesContextProvider } from "./components/store/recipes-context";

const router = createBrowserRouter([
	{ path: "/", element: <HomePage /> },
	{ path: "/grocery-list", element: <GroceryListPage /> },
	{ path: "/add-recipe", element: <NewRecipePage /> },
]);

const App: React.FC = () => {
	return (
		<RecipesContextProvider>
			<RouterProvider router={router}></RouterProvider>
		</RecipesContextProvider>
	);
};

export default App;
