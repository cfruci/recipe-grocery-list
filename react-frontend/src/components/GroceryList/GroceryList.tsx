import { useContext } from 'react';

import styles from './GroceryList.module.css';
import { GroceriesContext } from '../store/groceries-context';
import GroceryItem from './GroceryItem';
import { IngredientModel } from '../../models/recipe';

const GroceryList: React.FC<{ groceries: IngredientModel[] }> = ({
  groceries,
}) => {
  const groceriesCtx = useContext(GroceriesContext);

  const onClearHandler = () => {
    groceriesCtx.clearList();
  };

  const meats = groceries
    .filter((grocery) => grocery.type === 'meat')
    .map((grocery) => <GroceryItem key={grocery._id} grocery={grocery} />);

  const produce = groceries
    .filter((grocery) => grocery.type === 'produce')
    .map((grocery) => <GroceryItem key={grocery._id} grocery={grocery} />);

  const dairy = groceries
    .filter((grocery) => grocery.type === 'dairy')
    .map((grocery) => <GroceryItem key={grocery._id} grocery={grocery} />);

  const pantry = groceries
    .filter((grocery) => grocery.type === 'pantry')
    .map((grocery) => <GroceryItem key={grocery._id} grocery={grocery} />);

  return (
    <>
      <h2>Grocery List</h2>
      <ul className={styles.groceries}>
        {meats.length > 0 ? (
          <>
            <h3>Meats</h3>
            {meats}
            <hr />
          </>
        ) : (
          ''
        )}
        {produce.length > 0 ? (
          <>
            <h3>Produce</h3>
            {produce}
            <hr />
          </>
        ) : (
          ''
        )}

        {dairy.length > 0 ? (
          <>
            <h3>Dairy</h3>
            {dairy}
            <hr />
          </>
        ) : (
          ''
        )}
        {pantry.length > 0 ? (
          <>
            <h3>Pantry</h3>
            {pantry}
            <hr />
          </>
        ) : (
          ''
        )}
      </ul>
      {groceries.length > 0 ? (
        <button onClick={onClearHandler}>Clear List</button>
      ) : null}
    </>
  );
};

export default GroceryList;
