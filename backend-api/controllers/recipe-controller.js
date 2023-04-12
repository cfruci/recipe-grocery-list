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
    data: recipes,
  });
});

// POSTS a new recipe for a given user
exports.addNewRecipe = catchAsync(async (req, res, next) => {
  const newRecipe = await Recipe.create(req.body);
  res.status(200).json({ status: 'Success', data: newRecipe });
});

// GETS a single recipe for a given user
exports.getRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return next(new AppError('That recipe could not be found', 404));
  }
  res.status(200).json({ status: 'Success', data: recipe });
});

// PATCHES a recipe for a given user
exports.updateRecipe = catchAsync(async (req, res, next) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: 'Success', data: updatedRecipe });
});

// DELETES a recipe for a given user
exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) {
    return next(new AppError('That receipe was not found', 404));
  }
  res.status(204).json({ status: 'Success -- Recipe Deleted' });
});
