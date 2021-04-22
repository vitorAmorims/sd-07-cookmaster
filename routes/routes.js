const express = require('express');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const {
  validationName,
  validationPassword,
  validationEmail,
} = require('../middleware/userValidation');
const {
  loginPassword,
  loginEmail,
} = require('../middleware/loginValidation');

const router = express.Router();

router.post(
  '/users',
  validationName,
  validationPassword,
  validationEmail,
  usersController.createUsers,
);

router.post(
  '/login',
  loginPassword,
  loginEmail,
  loginController.login,
);

module.exports = router;
