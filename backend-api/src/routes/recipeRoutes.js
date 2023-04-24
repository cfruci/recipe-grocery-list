const express = require('express');

// local requires
const recipesController = require('../controllers/recipe-controller');
const groceriesController = require('../controllers/grocery-controller');
// const authController = require('../controllers/auth-controller');

const router = express.Router();

router
  .route('/')
  .get(recipesController.getAllRecipes)
  .post(recipesController.addNewRecipe);

router
  .route('/:slug')
  .get(recipesController.getRecipe)
  .patch(recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

module.exports = router;
