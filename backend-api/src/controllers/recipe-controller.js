const Recipe = require('../models/recipe-model');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const queryForCuisine = req.query;
  const recipes = await Recipe.find(queryForCuisine);
  if (!recipes) {
    return next(new AppError('Cannot find your recipes', 404));
  }
  res.status(200).json({
    status: 'Success',
    results: recipes.length,
    recipes,
  });
});

exports.addNewRecipe = catchAsync(async (req, res, next) => {
  const newRecipe = await Recipe.create(req.body);
  if (!newRecipe) {
    next(new AppError('Could not save your new recipe'));
  }
  res.status(200).json({ status: 'Success', newRecipe });
});

exports.getRecipe = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const recipe = await Recipe.findOne({ slug });
  if (!recipe) {
    return next(new AppError('That recipe could not be found', 404));
  }
  res.status(200).json({ status: 'Success', recipe });
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
  let filter = {};
  let update = {};

  const { slug } = req.params;

  switch (req.headers.action) {
    case 'addtogrocerylist':
      filter = { slug, 'ingredients.inGroceryList': false };
      update = req.body;
      break;
    case 'removefromgrocerylist':
      filter = { slug, 'ingredients.inGroceryList': true };
      update = req.body;
      break;
    case 'addingredient':
      const newIngredient = req.body;
      filter = { slug };
      update = { $push: { ingredients: newIngredient } };
      break;
    case 'deleteingredient':
      const { id } = req.body;
      filter = { slug };
      update = { $pull: { ingredients: { _id: id } } };
      break;
    case 'updateingredient':
      const updatedIngredient = req.body;
      filter = { slug, 'ingredients._id': updatedIngredient.id };
      update = {
        $set: {
          'ingredients.$.ingredientName': updatedIngredient.name,
          'ingredients.$.type': updatedIngredient.type,
          'ingredients.$.quantity': updatedIngredient.quantity,
          'ingredients.$.unit': updatedIngredient.unit,
        },
      };
      break;
    default:
      break;
  }

  const updatedRecipe = await Recipe.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (!updatedRecipe) {
    return next(new AppError('Could not update the recipe'));
  }

  res.status(200).json({ status: 'Success' });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const recipe = await Recipe.findOneAndDelete({ slug });
  if (!recipe) {
    return next(new AppError('That receipe was not found', 404));
  }
  res.status(204).json({ status: 'Success -- Recipe Deleted' });
});
