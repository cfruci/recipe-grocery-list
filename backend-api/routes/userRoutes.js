const express = require('express');
const authController = require('../controllers/auth-controller');
const usersController = require('../controllers/users-controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser)
  .delete(usersController.deleteAllUsers);

router
  .route('/:id')
  .get(usersController.showUserDetail)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
