import { useSubmit } from 'react-router-dom';
import styles from './ReadOnlyRow.module.css';

import { IngredientModel } from '../../models/recipe';

const ReadOnlyRow: React.FC<{
  ingredient: IngredientModel;
  editClickHandler: (ingredient: IngredientModel) => void;
}> = ({ ingredient, editClickHandler }) => {
  const submit = useSubmit();

  const deleteClickHandler = () => {
    submit(
      {
        action: 'deleteIngredient',
        ingredientId: ingredient._id!,
      },
      { method: 'PATCH' }
    );
  };

  return (
    <tr>
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
        <button className={styles.btn} onClick={deleteClickHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
