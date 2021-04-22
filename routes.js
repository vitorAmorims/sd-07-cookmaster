const express = require('express');

const route = express.Router();

const {
    validateUserMiddleware,
    validateUniqueUserMiddleware,
} = require('./middleware/userMiddlewares');

const { createUserController } = require('./controller/userController');

route.use(express.static(`${__dirname}recipeImages/`));

route.post('/users', validateUserMiddleware, validateUniqueUserMiddleware, createUserController);

route.post('/users/login', (_req, res) => res.json('Login de usuários'));

module.exports = route;
