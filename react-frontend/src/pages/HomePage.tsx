import NewRecipe from "../components/NewRecipe/NewRecipe";
import Recipes from "../components/Recipes/Recipes";

const HomePage: React.FC = () => {
	return (
		<>
			<Recipes />
			<NewRecipe />
		</>
	);
};

export default HomePage;
