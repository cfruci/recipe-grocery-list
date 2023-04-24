const express = require('express');

// local requires
const usersController = require('../controllers/users-controller');

const router = express.Router();

// router
//   .route('/')
//   .get(usersController.getAllUsers)
//   .post(usersController.createUser)
//   .delete(usersController.deleteAllUsers);

// router
//   .route('/:id')
//   .get(usersController.showUserDetail)
//   .patch(usersController.updateUser)
//   .delete(usersController.deleteUser);

module.exports = router;
