const express = require('express');
const usersController = require('./usersController');
const { validateUserMiddleware } = require('../middleware');

const route = express.Router();

route.get('/users', usersController.findUserController);
route.post('/users', validateUserMiddleware, usersController.registerUserController);

module.exports = route;
