import { useFetcher } from 'react-router-dom';
import styles from './Ingredients.module.css';

const NewIngredient: React.FC = () => {
  const fetcher = useFetcher();

  return (
    <>
      <h3>Add New Ingredient</h3>
      <fetcher.Form method="PATCH" className={styles.newIngredient}>
        <input
          name="addIngredient"
          value="addIngredient"
          readOnly
          hidden
        ></input>
        <input name="ingredientName" type="text" placeholder="Name..." />
        <select name="type" id="">
          <option defaultValue="Type..." disabled>
            Type...
          </option>
          <option value="dairy">dairy</option>
          <option value="meat">meat</option>
          <option value="pantry">pantry</option>
          <option value="produce">produce</option>
        </select>
        <input
          type="number"
          placeholder="Quantity..."
          name="quantity"
          min={0}
        />
        <select id="unit" name="unit">
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
        <button className={styles.ingredientBtns}>Add Ingredient</button>
      </fetcher.Form>
    </>
  );
};

export default NewIngredient;
