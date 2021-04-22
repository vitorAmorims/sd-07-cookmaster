const express = require('express');

const {
  error,
  userFieldsValidation,
  emailValidation,
  loginFieldsValidation,
  loginEmailValidation,
  loginPasswordValidation,
  validateAdm,
  validateToken,
} = require('../middlewares');

const {
  addAdmin,
  addUser,
} = require('../controllers/usersController');

const router = express.Router();

router.post(
  '/users',
  userFieldsValidation,
  emailValidation,
  addUser,
);

router.post(
  '/login',
  loginFieldsValidation,
  loginEmailValidation,
  loginPasswordValidation,
);

router.post(
  '/users/admin',
  validateToken,
  validateAdm,
  addAdmin,
);

router.use(error);

module.exports = router;