const express = require('express');
const userController = require('../controllers/usersController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post(
  '/users',
  middlewares.userFieldsValidation,
  middlewares.emailValidation,
  userController.addUser,
);

router.post(
  '/login',
  middlewares.loginFieldsValidation,
  middlewares.loginEmailValidation,
  middlewares.loginPasswordValidation,
);

router.post(
  '/users/admin',
  middlewares.validateToken,
  middlewares.validateAdm,
  userController.addAdmin,
);

router.use(middlewares.error);

module.exports = router;