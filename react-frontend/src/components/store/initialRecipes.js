export const initialRecipes = [
  {
    recipeName: 'Turkey Bake',
    cuisine: 'Mexican',
    addedToGroceryList: false,
    ingredients: [
      { ingredientName: 'turkey', type: 'Produce', quantity: 1 },
      { ingredientName: 'chicken', type: 'Meat', quantity: 1, unit: 'lb' },
    ],
  },
  {
    recipeName: 'Chicken Bake',
    cuisine: 'Mediterranean',
    addedToGroceryList: false,
    ingredients: [
      { ingredientName: 'lettuce', type: 'Produce', quantity: 4, unit: 'tsp' },
      { ingredientName: 'tomato', type: 'Produce', quantity: 2, unit: 'fl oz' },
    ],
  },
  {
    recipeName: 'Penne ala vodka',
    cuisine: 'Italian',
    addedToGroceryList: false,
    ingredients: [
      { ingredientName: 'pasta', type: 'Pantry', quantity: 1, unit: 'oz' },
      {
        ingredientName: 'whipping cream',
        type: 'Dairy',
        quantity: 1,
        unit: 'lb',
      },
    ],
  },
  {
    recipeName: 'Dim sum',
    cuisine: 'Chinese',
    addedToGroceryList: false,
    ingredients: [
      { ingredientName: 'pork', type: 'Pantry', quantity: 1, unit: 'cup' },
    ],
  },
];
