const express = require('express');
const groceriesController = require('../controllers/grocery-controller');

const router = express.Router();

router
  .route('/')
  .get(groceriesController.showGroceries)
  .patch(groceriesController.editGrocery)
  .delete(groceriesController.clearGroceries);

module.exports = router;
