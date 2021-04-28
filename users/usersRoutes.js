const express = require('express');
const usersController = require('./usersController');

const { 
  validateUserMiddleware,
  //  validateLoginMiddleware 
} = require('../middleware/validatesMiddleware');

const route = express.Router();

route.get('/users', usersController.findUserController);
route.post('/users', validateUserMiddleware, usersController.registerUserController);
// route.post('/login', validateLoginMiddleware, usersController.loginUserController);

module.exports = route;
