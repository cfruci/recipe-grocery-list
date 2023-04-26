import { useState } from 'react';

import styles from './Ingredients.module.css';

import { IngredientModel } from '../../models/recipe';
import ReadOnlyRow from './ReadOnlyRow';
import EditOnlyRow from './EditOnlyRow';
import NewIngredient from './NewIngredient';

const Ingredients: React.FC<{ ingredients: IngredientModel[] }> = ({
  ingredients,
}) => {
  const [editIngredientName, setEditIngredientName] = useState<string | null>(
    null
  );
  const [editFormData, setEditFormData] = useState<IngredientModel>({
    ingredientName: '',
    type: '',
    quantity: 0,
    unit: '',
  });

  const editClickHandler = (ingredient: IngredientModel) => {
    setEditIngredientName(ingredient.ingredientName);

    const editFormData = {
      id: ingredient._id,
      ingredientName: ingredient.ingredientName,
      type: ingredient.type,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    };

    setEditFormData(editFormData);
  };

  const saveIngredient = () => {
    setEditIngredientName(null);
  };

  const cancelClickHandler = () => {
    setEditIngredientName(null);
  };

  return (
    <section className={styles.ingredients}>
      <table className={styles.ingredientTable}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.leftColumn}>Ingredient</th>
            <th>Type</th>
            <th>Qnty</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient: IngredientModel) => {
            return editIngredientName === ingredient.ingredientName ? (
              <EditOnlyRow
                key={ingredient._id}
                ingredient={ingredient}
                saveIngredient={saveIngredient}
                cancelClickHandler={cancelClickHandler}
                editFormData={editFormData}
              />
            ) : (
              <ReadOnlyRow
                key={ingredient._id}
                ingredient={ingredient}
                editClickHandler={editClickHandler}
              />
            );
          })}
        </tbody>
      </table>
      <NewIngredient />
      <br />
    </section>
  );
};

export default Ingredients;
