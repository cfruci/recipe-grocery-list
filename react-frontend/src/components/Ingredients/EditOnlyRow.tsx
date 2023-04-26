import { useRef } from 'react';
import { useSubmit } from 'react-router-dom';
import styles from './EditOnlyRow.module.css';

import { IngredientModel } from '../../models/recipe';

const EditOnlyRow: React.FC<{
  ingredient: IngredientModel;
  saveIngredient: () => void;
  cancelClickHandler: () => void;
  editFormData: IngredientModel;
}> = ({ ingredient, saveIngredient, cancelClickHandler, editFormData }) => {
  const submit = useSubmit();
  const ingredientNameRef = useRef<HTMLInputElement>(null);
  const ingredientTypeRef = useRef<HTMLSelectElement>(null);
  const ingredientQuantityRef = useRef<HTMLInputElement>(null);
  const ingredientUnitRef = useRef<HTMLSelectElement>(null);

  const saveClickHandler = () => {
    submit(
      {
        action: 'saveIngredient',
        ingredientId: ingredient._id!,
        newName: ingredientNameRef.current!.value,
        newType: ingredientTypeRef.current!.value,
        newQuantity: ingredientQuantityRef.current!.value,
        newUnit: ingredientUnitRef.current!.value,
      },
      { method: 'PATCH' }
    );
    saveIngredient();
  };

  return (
    <tr key={ingredient._id} className={styles.editTableRow}>
      <td className={styles.leftColumn}>
        <input
          type="text"
          defaultValue={editFormData.ingredientName}
          ref={ingredientNameRef}
          className={styles.editInput}
        />
      </td>
      <td>
        <select
          name="newType"
          id=""
          ref={ingredientTypeRef}
          className={styles.editInput}
        >
          <option defaultValue="Type..." disabled>
            Type...
          </option>
          <option value="dairy">dairy</option>
          <option value="meat">meat</option>
          <option value="pantry">pantry</option>
          <option value="produce">produce</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          name="newQuantity"
          min={0}
          defaultValue={editFormData.quantity}
          ref={ingredientQuantityRef}
          className={styles.editInput}
        />
      </td>
      <td>
        <select id="unit" name="newUnit" ref={ingredientUnitRef}>
          <option defaultValue="Unit..." disabled>
            Unit...
          </option>
          <option value="n/a">n/a</option>
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
      </td>
      <td className={styles.ingredientActions}>
        <button className={styles.btn} onClick={saveClickHandler}>
          Save
        </button>
        <button className={styles.btn} onClick={() => cancelClickHandler()}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditOnlyRow;
