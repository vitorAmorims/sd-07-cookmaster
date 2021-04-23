const express = require('express');

const routes = express.Router();

const userController = require('./src/controllers/UserController');
const { validateCreateUser } = require('./src/middlewares/UserMiddleware');

routes.post('/users', validateCreateUser, userController.create);

module.exports = routes;
