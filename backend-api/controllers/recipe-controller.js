const Recipe = require('../models/recipe-model');

exports.getAllRecipes = async (req, res) => {
  try {
    const queryForCuisine = req.query;
    const recipes = await Recipe.find(queryForCuisine);
    res.status(200).json({
      status: 'Success',
      results: recipes.length,
      data: recipes,
    });
  } catch (err) {
    res.status(400).json({ status: 'Failed', message: err });
  }
};

exports.addNewRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(200).json({ status: 'Success', data: newRecipe });
  } catch (err) {
    res.status(400).json({ status: 'Failed', message: err });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json({ status: 'Success', data: recipe });
  } catch (err) {
    res.status(400).json({ status: 'Failed', message: err });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: 'Success', data: updatedRecipe });
  } catch (err) {
    res.status(400).json({ status: 'Failed', message: err });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'Success -- Recipe Deleted' });
  } catch (err) {
    res.status(400).json({ status: 'Failed', message: err });
  }
};
