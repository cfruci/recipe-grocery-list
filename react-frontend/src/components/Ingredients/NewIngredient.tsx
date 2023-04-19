import { useRef } from 'react';
import { useSubmit } from 'react-router-dom';
import styles from './Ingredients.module.css';

const NewIngredient: React.FC = () => {
  const submit = useSubmit();
  const newIngredientNameRef = useRef<HTMLInputElement>(null);
  const newIngredientTypeRef = useRef<HTMLSelectElement>(null);
  const newIngredientQuantityRef = useRef<HTMLInputElement>(null);
  const newIngredientUnitRef = useRef<HTMLSelectElement>(null);

  const submitNewIngredient = (event: React.FormEvent) => {
    event.preventDefault();

    submit(
      {
        action: 'addNewIngredient',
        newIngredientName: newIngredientNameRef.current!.value,
        newIngredientType: newIngredientTypeRef.current!.value,
        newIngredientQuantity: newIngredientQuantityRef.current!.value,
        newIngredientUnit: newIngredientUnitRef.current!.value,
      },
      { method: 'PATCH' }
    );

    newIngredientNameRef.current!.value = '';
    newIngredientTypeRef.current!.value = '';
    newIngredientQuantityRef.current!.value = '';
    newIngredientUnitRef.current!.value = '';
  };

  return (
    <>
      <h3>Add New Ingredient</h3>
      <form className={styles.newIngredient} onSubmit={submitNewIngredient}>
        <input
          type="text"
          placeholder="Name..."
          ref={newIngredientNameRef}
          required
        />
        <select ref={newIngredientTypeRef} required>
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
          min={0}
          ref={newIngredientQuantityRef}
          required
        />
        <select ref={newIngredientUnitRef} required>
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
      </form>
    </>
  );
};

export default NewIngredient;
