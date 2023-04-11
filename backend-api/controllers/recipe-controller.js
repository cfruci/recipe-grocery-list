const Recipe = require('../models/recipe-model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const queryForCuisine = req.query;
  const recipes = await Recipe.find(queryForCuisine);
  res.status(200).json({
    status: 'Success',
    results: recipes.length,
    data: recipes,
  });
});

exports.addNewRecipe = catchAsync(async (req, res, next) => {
  const newRecipe = await Recipe.create(req.body);
  res.status(200).json({ status: 'Success', data: newRecipe });
});

exports.getRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    next(new AppError('That recipe could not be found', 404));
  }
  res.status(200).json({ status: 'Success', data: recipe });
});

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

exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) {
    next(new AppError('That receipe was not found', 404));
  }
  res.status(204).json({ status: 'Success -- Recipe Deleted' });
});
