import { IngredientModel } from "../../models/recipe";
import Ingredient from "./Ingredient/Ingredient";
import styles from "./Ingredients.module.css";

const Ingredients: React.FC<{ ingredients: IngredientModel[] }> = ({
	ingredients,
}) => {
	return (
		<ul className={styles.container}>
			{ingredients.map((ingredient) => (
				<Ingredient key={ingredient.id} ingredient={ingredient} />
			))}
		</ul>
	);
};

export default Ingredients;
