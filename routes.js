const express = require('express');

const routes = express.Router();

const userController = require('./src/controllers/UserController');
const { validateInputs } = require('./src/middlewares/userMiddleware');

routes.post('/users', validateInputs, userController.create);

module.exports = routes;