// local require
const Recipe = require('../models/recipe-model');

// util requires
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GETS all recipes in the database for a given user
exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const queryForCuisine = req.query;
  const recipes = await Recipe.find(queryForCuisine);
  res.status(200).json({
    status: 'Success',
    results: recipes.length,
    recipes,
  });
});

// POSTS a new recipe for a given user
exports.addNewRecipe = catchAsync(async (req, res, next) => {
  const newRecipe = await Recipe.create(req.body);
  if (!newRecipe) {
    next(new AppError('Could not save your new recipe'));
  }
  res.status(200).json({ status: 'Success', newRecipe });
});

// GETS a single recipe for a given user
exports.getRecipe = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const recipe = await Recipe.findOne({ slug });
  if (!recipe) {
    return next(new AppError('That recipe could not be found', 404));
  }
  res.status(200).json({ status: 'Success', recipe });
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const filter = { slug };

  if (req.headers.addtogrocerylist === 'true') {
    filter['ingredients.inGroceryList'] = false;
  } else {
    filter['ingredients.inGroceryList'] = true;
  }
  const updatedRecipe = await Recipe.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  if (!updatedRecipe) {
    return next(new AppError('Could not find recipe'));
  }

  res.status(200).json({ status: 'Success', updatedRecipe });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const recipe = await Recipe.findOneAndDelete({ slug });
  if (!recipe) {
    return next(new AppError('That receipe was not found', 404));
  }
  res.status(204).json({ status: 'Success -- Recipe Deleted' });
});
