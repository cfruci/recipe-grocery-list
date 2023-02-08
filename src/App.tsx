import React from "react";
import "./App.css";
import MainNav from "./components/MainNav";
import Recipes from "./components/Recipes";
import { RecipesContextProvider } from "./components/store/recipes-context";

const App: React.FC = () => {
	return (
		<RecipesContextProvider>
			<MainNav />
			<Recipes />
		</RecipesContextProvider>
	);
};

export default App;
