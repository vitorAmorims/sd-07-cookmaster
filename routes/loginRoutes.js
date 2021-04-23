const express = require('express');
const loginController = require('../controllers/loginController');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/login', validateLogin, loginController);

module.exports = router;
