import styles from './ReadOnlyRow.module.css';

import { IngredientModel } from '../../models/recipe';

const ReadOnlyRow: React.FC<{
  ingredient: IngredientModel;
  editClickHandler: (ingredient: IngredientModel) => void;
}> = ({ ingredient, editClickHandler }) => {
  return (
    <tr>
      <td hidden>
        <input
          hidden
          readOnly
          name="deleteIngredient"
          value="deleteIngredient"
        />
      </td>
      <td hidden>
        <input hidden readOnly value={ingredient._id} name="ingredientId" />
      </td>
      <td className={`${styles.ingredient} ${styles.leftColumn}`}>
        {ingredient.ingredientName}
      </td>
      <td>{ingredient.type}</td>
      <td>{ingredient.quantity}</td>
      <td>{ingredient.unit}</td>
      <td className={styles.actions}>
        <button
          className={styles.btn}
          onClick={() => editClickHandler(ingredient)}
        >
          Edit
        </button>
        <button className={styles.btn}>Delete</button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
