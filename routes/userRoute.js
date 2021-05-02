const express = require('express');
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const userModel = require('../models/userModel');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.registerUser);
router.post('/login', loginController.loginUser);

module.exports = router;
