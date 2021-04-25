const express = require('express');
const {
  validateObligatoryLoginFields, validateLogin,
} = require('../middlewares');
const LoginControllers = require('../controllers/LoginControllers');

const router = express.Router();

router.post(
  '/login',
  validateObligatoryLoginFields,
  validateLogin,
  LoginControllers.login,
);

module.exports = router;
