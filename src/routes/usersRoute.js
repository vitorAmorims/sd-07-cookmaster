const express = require('express');

const { userControllers } = require('../controllers');
const { usersMiddlewares, tokenValidator } = require('../middlewares');

const route = express.Router();

route.post('/users', usersMiddlewares.mailAlreadyExists, userControllers.creatUser);
route.post('/users/admin',
  tokenValidator,
  usersMiddlewares.creatAdminUser,
  usersMiddlewares.mailAlreadyExists,
  userControllers.creatUser);

module.exports = route;
