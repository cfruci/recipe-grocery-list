const express = require('express');
const recipesController = require('../controllers/recipe-controller');

const router = express.Router();

router.param('id', recipesController.checkId);

router
  .route('/')
  .get(recipesController.getAllRecipes)
  .post(recipesController.addNewRecipe);

router
  .route('/:id')
  .get(recipesController.getRecipe)
  .patch(recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

module.exports = router;
