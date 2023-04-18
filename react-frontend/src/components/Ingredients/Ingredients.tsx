import { useState } from 'react';
import { useFetcher } from 'react-router-dom';

import styles from './Ingredients.module.css';

import { IngredientModel } from '../../models/recipe';
import ReadOnlyRow from './ReadOnlyRow';
import EditOnlyRow from './EditOnlyRow';
import NewIngredient from './NewIngredient';

const Ingredients: React.FC<{ ingredients: IngredientModel[] }> = ({
  ingredients,
}) => {
  const fetcher = useFetcher();

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

  const cancelClickHandler = () => {
    setEditIngredientName(null);
  };

  return (
    <section className={styles.ingredients}>
      <fetcher.Form method="PATCH">
        <input
          name="updateIngredient"
          value="updateIngredient"
          hidden
          readOnly
        />

        <table className={styles.ingredientTable}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.leftColumn}>Ingredient</th>
              <th>Type</th>
              <th>Quantity</th>
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
      </fetcher.Form>

      <NewIngredient />
      <br />
    </section>
  );
};

export default Ingredients;
