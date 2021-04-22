const express = require('express');

const route = express.Router();

const {
    validateCreateUserMiddleware,
    validateUniqueUserMiddleware,
    validateLoginUserMiddleware,
    validatePasswordMiddleware,
} = require('./middleware/userMiddlewares');

const { createUserController, loginUserController } = require('./controller/userController');

route.use(express.static(`${__dirname}recipeImages/`));

route.post(
    '/users',
    validateCreateUserMiddleware,
    validateUniqueUserMiddleware,
    createUserController,
);

route.post(
    '/login',
    validateLoginUserMiddleware,
    validatePasswordMiddleware,
    loginUserController,
);

module.exports = route;
