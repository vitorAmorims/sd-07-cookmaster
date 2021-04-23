const express = require('express');

const routes = express.Router();

const userController = require('./src/controllers/UserController');
const { validateCreateUser, validadeLoginUser } = require('./src/middlewares/UserMiddleware');

routes.post('/users', validateCreateUser, userController.create);
routes.post('/login', validadeLoginUser, userController.login);

module.exports = routes;
