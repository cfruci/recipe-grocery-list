import { useState } from 'react';
import { useFetcher, useSubmit } from 'react-router-dom';

import styles from './Ingredients.module.css';

import { IngredientModel } from '../../models/recipe';
import ReadOnlyRow from './ReadOnlyRow';
import EditOnlyRow from './EditOnlyRow';
import NewIngredient from './NewIngredient';

const Ingredients: React.FC<{ ingredients: IngredientModel[] }> = ({
  ingredients,
}) => {
  const fetcher = useFetcher();
  const submit = useSubmit();

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
      ingredientName: ingredient.ingredientName,
      type: ingredient.type,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    };

    setEditFormData(editFormData);
  };

  const deleteClickHandler = (ingredient: IngredientModel) => {
    submit(
      { action: 'deleteIngredient', ingredient: ingredient._id! },
      { method: 'PATCH' }
    );
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
                  deleteClickHandler={() => deleteClickHandler(ingredient)}
                />
              );
            })}
          </tbody>
        </table>
      </fetcher.Form>

      <h3>Add New Ingredient</h3>
      <NewIngredient />
      <br />
    </section>
  );
};

export default Ingredients;
