const express = require('express');
const loginController = require('../controller/loginController');
const { checkUserToLogin, checkUserAndPass } = require('../middleware/loginMiddleware');

const router = express.Router();

router.post('/login', checkUserToLogin, checkUserAndPass, loginController.onLogin);

module.exports = router;