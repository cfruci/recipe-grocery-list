const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const recipeController = require('./recipe-controller');

exports.showHome = catchAsync(async (req, res, next) => {
  await recipeController.getAllRecipes(req, res);
});
