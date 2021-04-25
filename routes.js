const express = require('express');

const routes = express.Router();

const userController = require('./src/controllers/UserController');
const recipeController = require('./src/controllers/RecipeController');

const { validateCreateUser, validadeLoginUser } = require('./src/middlewares/UserMiddleware');
const { validateCreateRecipe } = require('./src/middlewares/RecipeMiddleware');

routes.post('/users', validateCreateUser, userController.create);
routes.post('/login', validadeLoginUser, userController.login);

routes.post('/recipes', validateCreateRecipe, recipeController.create);

module.exports = routes;
