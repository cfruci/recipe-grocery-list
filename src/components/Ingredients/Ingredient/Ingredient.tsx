import { IngredientModel } from "../../../models/recipe";
import styles from "./Ingredient.module.css";

const Ingredient: React.FC<{ ingredient: IngredientModel }> = ({
	ingredient,
}) => {
	return (
		<li className={styles.ingredient}>{`${ingredient.id}: ${
			ingredient.quantity
		}${ingredient.unit ? ingredient.unit : ""}`}</li>
	);
};

export default Ingredient;
