import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipesContext } from "../components/store/recipes-context";
import Ingredients from "../components/Ingredients/Ingredients";

const RecipePage: React.FC = () => {
	const params = useParams();
	const recipeId = params.recipeId;
	const ctx = useContext(RecipesContext);

	const { id } = ctx.recipes.filter((recipe) => recipe.id === recipeId)[0];

	const navigate = useNavigate();
	const onClickHandler = () => {
		navigate("/recipes");
	};
	return (
		<>
			<button onClick={onClickHandler}>Back to All Recipes</button>
			<hr />
			<section style={{ maxWidth: "20rem", margin: "auto" }}>
				<h2>{id}</h2>
				<Ingredients />
			</section>
		</>
	);
};

export default RecipePage;
