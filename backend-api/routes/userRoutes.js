const express = require('express');
const usersController = require('../controllers/users-controller');

const router = express.Router();

router
  .route('/')
  .get(usersController.showAllUsers)
  .post(usersController.createNewUser);

router
  .route('/:id')
  .get(usersController.showUserDetail)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
