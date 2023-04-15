const express = require('express');
const groceriesController = require('../controllers/grocery-controller');

const router = express.Router();

router
  .route('/')
  .get(groceriesController.showGroceries)
  .patch(groceriesController.removeGrocery);

module.exports = router;
