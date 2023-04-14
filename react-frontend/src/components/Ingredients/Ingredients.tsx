import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Ingredients.module.css';

import { IngredientModel } from '../../models/recipe';
import ReadOnlyRow from './ReadOnlyRow';
import EditOnlyRow from './EditOnlyRow';

const Ingredients: React.FC<{ ingredients: IngredientModel[] }> = ({
  ingredients,
}) => {
  const navigate = useNavigate();

  const newIngredientName = useRef<HTMLInputElement>(null);
  const newIngredientQuantity = useRef<HTMLInputElement>(null);
  const newIngredientUnit = useRef<HTMLSelectElement>(null);

  const [editIngredientName, setEditIngredientName] = useState<string | null>(
    null
  );
  const [editFormData, setEditFormData] = useState<IngredientModel>({
    ingredientName: '',
    type: '',
    quantity: 0,
    unit: '',
  });

  const onNavigateHandler = () => {
    navigate('/');
  };

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

  const onEditQuantityChangeHandler = (
    ingredient: IngredientModel,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const editingIngredient = {
      ...ingredient,
      quantity: parseInt(event.currentTarget.value!),
    };
    setEditFormData(editingIngredient);
  };

  const onEditUnitChangeHandler = (
    ingredient: IngredientModel,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const editingIngredient = {
      ...ingredient,
      unit: event.currentTarget.value!,
    };
    setEditFormData(editingIngredient);
  };

  const deleteClickHandler = (ingredient: string) => {
    console.log('ingredient deleted');
  };

  const cancelClickHandler = () => {
    setEditIngredientName(null);
  };

  const saveClickHandler = (event: React.FormEvent) => {
    console.log('updated ingredient saved');
  };

  const addIngredientHandler = (event: React.FormEvent): void => {
    console.log('added ingredient');
  };

  return (
    <section className={styles.ingredients}>
      <form action="">
        <table className={styles.ingredientTable}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.leftColumn}>Ingredient</th>
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
                  saveClickHandler={saveClickHandler}
                  editFormData={editFormData}
                  onEditQuantityChangeHandler={onEditQuantityChangeHandler}
                  onEditUnitChangeHandler={onEditUnitChangeHandler}
                />
              ) : (
                <ReadOnlyRow
                  key={ingredient._id}
                  ingredient={ingredient}
                  editClickHandler={editClickHandler}
                  deleteClickHandler={deleteClickHandler}
                />
              );
            })}
          </tbody>
        </table>
      </form>
      <h3>Add New Ingredient</h3>
      <form
        onSubmit={(event: React.FormEvent) => addIngredientHandler(event)}
        className={styles.newIngredient}
      >
        <input
          type="text"
          placeholder="Ingredient..."
          ref={newIngredientName}
        />
        <input
          type="number"
          placeholder="Quantity..."
          min={0}
          ref={newIngredientQuantity}
        />
        <select id="unit" ref={newIngredientUnit}>
          <option value="Unit...">Unit...</option>
          <option value="mL">mL</option>
          <option value="L">L</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
          <option value="fl oz">fl oz</option>
          <option value="cup">cup</option>
          <option value="pint">pint</option>
          <option value="quart">quart</option>
          <option value="gallon">gallon</option>
          <option value="mg">mg</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="lb">lb</option>
          <option value="oz">oz</option>
        </select>
        <button className={styles.ingredientBtns}>Add Ingredient</button>
      </form>
      <br />
      <button onClick={onNavigateHandler}>Back to All Recipes</button>
    </section>
  );
};

export default Ingredients;
