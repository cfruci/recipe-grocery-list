const express = require('express');
const groceryListController = require('../controllers/grocery-controller');

const router = express.Router();

router
  .route('/')
  .get(groceryListController.showGroceryList)
  .patch(groceryListController.updateGroceryList)
  .delete(groceryListController.deleteGroceryList);

module.exports = router;
