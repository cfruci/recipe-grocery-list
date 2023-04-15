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
  if (req.headers.action === 'clearList') {
    const recipes = await Recipe.find(req.body);
    recipes.forEach((recipe) =>
      recipe.save({
        $set: {
          addedToGroceryList: false,
          'ingredients.$[].inGroceryList': false,
        },
      })
    );
    console.log(recipes);
  } else if (req.headers.action === 'deleteIngredient') {
    // const recipe = await Recipe.find(req.body);
    if (!recipe) {
      next(new AppError('could not find that recipe'));
    }
    // code here
  } else
    res.status(200).json({ status: 'Successfully removed grocery', recipes });
});
