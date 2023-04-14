const catchAsync = require('../utils/catchAsync');
const Recipe = require('../models/recipe-model');
const AppError = require('../utils/appError');

exports.showGroceries = catchAsync(async (req, res, next) => {
  const groceries = await Recipe.find({
    ingredients: { inGroceryList: true },
  });
  if (!groceries) {
    return next(new AppError('Could not find groceries'));
  }
  res.status(200).json({ status: 'Success', groceries });
});

exports.editGrocery = catchAsync(async (req, res, next) => {
  // const updatedGrocery = await Recipe.findOneAndUpdate(req.params._id, {
  //   'ingredients.inGroceryList': inGroceryList,
  // });
  // if (!updatedGrocery) {
  //   return next(AppError('Could not find that grocery item'));
  // }
  // res.status(200).json({ status: 'Succesfully updated item in Grocery List' });
});

exports.clearGroceries = catchAsync(async (req, res, next) => {
  const removedGroceries = await Recipe.updateMany(
    { ingredients: { inGroceryList: true } },
    { ingredients: { inGroceryList: false } }
  );
  if (!removedGroceries) {
    return next(
      new AppError('Something went wrong with clearing the groceries')
    );
  }
  res.status(200).json({ status: 'Successfully removed groceries' });
});
