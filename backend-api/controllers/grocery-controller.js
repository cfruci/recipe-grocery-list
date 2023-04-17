const catchAsync = require('../utils/catchAsync');
const Recipe = require('../models/recipe-model');
const AppError = require('../utils/appError');

exports.showGroceries = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find({ addedToGroceryList: true });
  if (!recipes) {
    return next(new AppError('Could not find groceries'));
  }

  const groceries = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.inGroceryList) {
        groceries.push(ingredient);
      }
    });
  });
  res.status(200).json({ status: 'Success', groceries });
});

exports.removeGrocery = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find({});
  if (!recipes) {
    return next(new AppError('could not find recipes'));
  }

  if (req.headers.action === 'clearList') {
    await Recipe.updateMany(
      {
        addedToGroceryList: true,
        'ingredients.inGroceryList': true,
      },
      {
        $set: {
          addedToGroceryList: false,
          'ingredients.$[].inGroceryList': false,
        },
      }
    );
    res
      .status(200)
      .json({ status: 'Successfully removed groceries', groceries: [] });
  } else {
    const { ingredient } = req.body;
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { 'ingredients.ingredientName': { $eq: ingredient } },
      { $set: { 'ingredients.$.inGroceryList': false } },
      { new: true }
    );

    const activeIngredients = updatedRecipe.ingredients.filter(
      (ingredient) => ingredient.inGroceryList
    );

    if (activeIngredients.length === 0) {
      await updatedRecipe.updateOne({ addedToGroceryList: false });
    }

    const groceries = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.inGroceryList) {
          groceries.push(ingredient);
        }
      });
    });
    res.status(200).json({ status: 'success', groceries });
  }
});
