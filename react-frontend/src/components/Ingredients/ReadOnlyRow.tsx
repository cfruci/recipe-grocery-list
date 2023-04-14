import styles from './ReadOnlyRow.module.css';

import { IngredientModel } from '../../models/recipe';

const ReadOnlyRow: React.FC<{
  ingredient: IngredientModel;
  editClickHandler: (ingredient: IngredientModel) => void;
  deleteClickHandler: (ingredientName: string) => void;
}> = ({ ingredient, editClickHandler, deleteClickHandler }) => {
  return (
    <tr>
      <td className={`${styles.ingredient} ${styles.leftColumn}`}>
        {ingredient.ingredientName}
      </td>
      <td>{ingredient.quantity}</td>
      <td>{ingredient.unit}</td>
      <td className={styles.actions}>
        <button
          className={styles.ingredientBtns}
          onClick={() => editClickHandler(ingredient)}
        >
          Edit
        </button>
        <button
          className={styles.ingredientBtns}
          onClick={() => deleteClickHandler(ingredient.ingredientName)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
