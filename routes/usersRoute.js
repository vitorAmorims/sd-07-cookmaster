const express = require('express');

const {
  createUser,
  userLogin,
} = require('../controllers/usersController');

const {
  userDataValidation,
  checkDuplicate,
  checkLoginData,
  loginDataValidation,
} = require('../middlewares');

const usersRoute = express.Router();

usersRoute.post('/users', userDataValidation, checkDuplicate, createUser);

usersRoute.post('/login', checkLoginData, loginDataValidation, userLogin);

module.exports = usersRoute;