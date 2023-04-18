import styles from './EditOnlyRow.module.css';

import { IngredientModel } from '../../models/recipe';

const EditOnlyRow: React.FC<{
  ingredient: IngredientModel;
  cancelClickHandler: () => void;
  editFormData: IngredientModel;
}> = ({ ingredient, cancelClickHandler, editFormData }) => {
  return (
    <tr key={ingredient._id}>
      <td hidden>
        {' '}
        <input hidden readOnly name="ingredientId" value={ingredient._id} />
      </td>
      <td className={styles.leftColumn}>
        <input
          type="text"
          name="newName"
          defaultValue={editFormData.ingredientName}
        />
      </td>
      <td>
        <select name="newType" id="">
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
        />
      </td>
      <td>
        <select id="unit" name="newUnit">
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
        <button type="submit" className={styles.btn}>
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
