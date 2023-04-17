import { useSubmit } from 'react-router-dom';
import { IngredientModel } from '../../models/recipe';
import styles from './GroceryItem.module.css';

const GroceryItem: React.FC<{
  grocery: IngredientModel;
}> = ({ grocery }) => {
  const submit = useSubmit();

  const onDeleteHandler = () => {
    submit(
      { type: 'deleteIngredient', name: grocery.ingredientName },
      { method: 'patch' }
    );
  };

  return (
    <li className={styles.grocery}>
      <span>{`${grocery.ingredientName}: ${grocery.quantity} ${grocery.unit}`}</span>
      <span className={styles.deleteBtn} onClick={onDeleteHandler}>
        X
      </span>
    </li>
  );
};

export default GroceryItem;
