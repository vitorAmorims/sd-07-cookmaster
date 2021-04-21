const express = require('express');
const userController = require('./controller/userController');
const recipeController = require('./controller/recipeController');
const userValidation = require('./middleware/userValidation');
const checkToken = require('./middleware/checkToken');
const checkRecipeInputs = require('./middleware/checkRecipeInputs');

const routes = express();

routes.get(('/users'), userController.getAll);
routes.post(('/users'), userValidation, userController.create);
routes.post(('/users/admin'), userValidation, userController.createAdmin);
routes.post(('/login'), userController.login);

const recipeId = '/recipes/:id';
routes.post(('/recipes'), checkRecipeInputs, checkToken, recipeController.create);
routes.get((recipeId), recipeController.getById);
routes.get(('/recipes'), recipeController.getAll);
routes.put((recipeId), recipeController.editById);
routes.delete((recipeId), recipeController.deleteById);

module.exports = routes;