const recipeController = require('./recipe-controller');

exports.showHome = async (req, res) => {
  recipeController.getAllRecipes(req, res);
};
