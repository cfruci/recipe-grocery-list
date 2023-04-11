const catchAsync = require('../utils/catchAsync');

exports.showGroceryList = catchAsync(async (req, res, next) => {
  res.send('For showing grocery list');
});

exports.updateGroceryList = catchAsync((req, res, next) => {
  res.send('For updating the grocery list');
});

exports.deleteGroceryList = catchAsync(async (req, res, next) => {
  res.send('For deleting grocery list');
});
