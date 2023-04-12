import { createContext, useState } from 'react';
import { IngredientModel } from '../../models/recipe';
import Props from '../../models/props';

const initialGroceries: IngredientModel[] = [];

type groceriesObj = {
  groceries: IngredientModel[];
  addIngredients: (ingredients: IngredientModel[]) => void;
  deleteIngredient: (ingredient: IngredientModel) => void;
  clearList: () => void;
};

export const GroceriesContext = createContext<groceriesObj>({
  groceries: [],
  addIngredients: () => {},
  deleteIngredient: () => {},
  clearList: () => {},
});

export const GroceriesContextProvider: React.FC<Props> = (props) => {
  const [groceries, setGroceries] = useState(initialGroceries);

  const deleteIngredientHandler = (ingredient: IngredientModel) => {
    const existingIngredientIndex = groceries.findIndex(
      (grocery) => grocery.id === ingredient.id
    );
    if (groceries[existingIngredientIndex].quantity > 1) {
      const existingIngredientQuantity =
        groceries[existingIngredientIndex].quantity;
      const updatedIngredient = {
        ...groceries[existingIngredientIndex],
        quantity: existingIngredientQuantity - 1,
      };
      setGroceries((prevGroceries) => {
        const newGroceries = [...prevGroceries];
        newGroceries[existingIngredientIndex] = updatedIngredient;
        return newGroceries;
      });
    } else {
      setGroceries((prevGroceries) =>
        prevGroceries.filter((grocery) => grocery.id !== ingredient.id)
      );
    }
  };

  const addIngredientsHandler = (ingredients: IngredientModel[]) => {
    const groceriesHash: {
      [key: string]: boolean;
    } = {};

    groceries.forEach((grocery) => {
      if (!groceriesHash[grocery.id]) {
        groceriesHash[grocery.id] = true;
      }
    });

    ingredients.forEach((ingredient) => {
      if (!groceriesHash[ingredient.id]) {
        groceriesHash[ingredient.id] = true;
        setGroceries((prevGroceries) => prevGroceries.concat(ingredient));
      } else {
        const existingIndex = groceries.findIndex(
          (grocery) => grocery.id === ingredient.id
        );
        const updatedQuantity = groceries[existingIndex].quantity + 1;

        setGroceries((prevGroceries) => {
          const newGroceries: IngredientModel[] = [...prevGroceries];
          newGroceries[existingIndex].quantity = updatedQuantity;
          return newGroceries;
        });
      }
    });
  };

  const clearListHandler = () => {
    setGroceries((prevGroceries) => []);
  };

  const groceryCtx: groceriesObj = {
    groceries,
    addIngredients: addIngredientsHandler,
    deleteIngredient: deleteIngredientHandler,
    clearList: clearListHandler,
  };

  return (
    <GroceriesContext.Provider value={groceryCtx}>
      {props.children}
    </GroceriesContext.Provider>
  );
};
