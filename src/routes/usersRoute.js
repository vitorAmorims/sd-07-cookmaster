const express = require('express');

const { userControllers } = require('../controllers');
const { usersMiddlewares } = require('../middlewares');

const route = express.Router();

route.post('/users', usersMiddlewares.mailAlreadyExists, userControllers.creatUser);

module.exports = route;
