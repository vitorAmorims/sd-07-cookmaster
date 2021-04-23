const express = require('express');
const rescue = require('express-rescue');
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const { entriesValidate, isSigned, loginValidate, authValidate } = require('../middlewares');

const router = express.Router();

router.post('/users', entriesValidate, isSigned, rescue(UserController.create));
router.post('/login', loginValidate, authValidate, rescue(LoginController));

module.exports = router;