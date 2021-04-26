const express = require('express');
const userController = require('../controllers/userControllers');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const userModel = require('../models/userModel');

const router = express.Router();

router.post('/users', userController.registerUser);

module.exports = router;
