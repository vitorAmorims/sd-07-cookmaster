const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateLogin, validateToken } = require('../middlewares');

const router = express.Router();

router.post('/users', validateUser, userController.createUser);
router.post('/login', validateLogin, userController.loginUser);
router.post('/users/admin', validateToken, userController.adminUser);

module.exports = router;