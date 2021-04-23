const express = require('express');

const route = express.Router();

const {
    validateCreateUserMiddleware,
    validateUniqueUserMiddleware,
    validateLoginUserMiddleware,
    validatePasswordMiddleware,
} = require('./middleware/userMiddlewares');

const {
    validateTokenMiddleware,
    validateCreateRecipeMiddleware,
} = require('./middleware/recipeMiddlewares');

const {
    createUserController,
    loginUserController,
} = require('./controller/userController');

const {
    createRecipeController,
} = require('./controller/recipeController');

route.use(express.static(`${__dirname}uploads/`));

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

route.post(
    '/recipes',
    validateCreateRecipeMiddleware,
    validateTokenMiddleware,
    createRecipeController,
);

module.exports = route;
