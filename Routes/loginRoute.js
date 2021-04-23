const express = require('express');
const login = require('../Controllers/loginController');
const { loginValidationMidd } = require('../Middlewares/loginValidationMidd');

const router = express.Router();

router.post('/login', loginValidationMidd, login.loginUser);

module.exports = router;