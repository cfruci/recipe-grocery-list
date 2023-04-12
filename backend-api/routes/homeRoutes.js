const express = require('express');
const homeController = require('../controllers/home-controller');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.route('/').get(homeController.showHome);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
