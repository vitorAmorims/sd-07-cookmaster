const express = require('express');
const rescue = require('express-rescue');
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const {
  entriesValidate,
  isSigned,
  loginValidate,
  authValidate,
  isAdmin,
  tokenValidate,
} = require('../middlewares');

const router = express.Router();

router.post('/users', entriesValidate, isSigned, rescue(UserController.create));
router.post(
  '/users/admin',
  tokenValidate,
  entriesValidate,
  isSigned,
  isAdmin,
  rescue(UserController.create),
);
router.post('/login', loginValidate, authValidate, rescue(LoginController));

module.exports = router;