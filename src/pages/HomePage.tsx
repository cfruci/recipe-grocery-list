import NewRecipe from "../components/NewRecipe/NewRecipe";
import Recipes from "../components/Recipes/Recipes";

const HomePage: React.FC = () => {
	return (
		<main>
			<section>
				<h1>Shop by Recipe</h1>
				<p>Build a grocery list based on your favorite recipes!</p>
				<hr></hr>
				<br />
			</section>
			<Recipes />
			<NewRecipe />
		</main>
	);
};

export default HomePage;
