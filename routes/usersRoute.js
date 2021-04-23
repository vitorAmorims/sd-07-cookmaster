const express = require('express');

const {
  createUser,
  userLogin,
  createAdmin,
} = require('../controllers/usersController');

const {
  userDataValidation,
  checkDuplicate,
  checkLoginData,
  loginDataValidation,
} = require('../middlewares');

const validateToken = require('../auth/validateToken');
const checkAdminStatus = require('../auth/checkAdminStatus');

const usersRoute = express.Router();

usersRoute.post('/users', userDataValidation, checkDuplicate, createUser);

usersRoute.post('/login', checkLoginData, loginDataValidation, userLogin);

usersRoute.post('/users/admin', validateToken, checkAdminStatus, createAdmin);

module.exports = usersRoute;