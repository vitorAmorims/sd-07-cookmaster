const express = require('express');

const routes = express.Router();

const userController = require('./src/controllers/UserController');
const recipeController = require('./src/controllers/RecipeController');

const {
  validateCreateUser,
  validadeLoginUser,
  validateCreateUserAdmin,
} = require('./src/middlewares/UserMiddleware');
const {
  validateCreateRecipe,
  validateDeleteRecipe,
} = require('./src/middlewares/RecipeMiddleware');

routes.post('/users', validateCreateUser, userController.create);
routes.post('/users/admin', validateCreateUser, validateCreateUserAdmin, userController.create);
routes.post('/login', validadeLoginUser, userController.login);

routes.post('/recipes', validateCreateRecipe, recipeController.create);

routes.get('/recipes', recipeController.getAll);
routes.route('/recipes/:id')
  .get(recipeController.getById)
  .put(validateCreateRecipe, recipeController.update)
  .delete(validateDeleteRecipe, recipeController.delete);

module.exports = routes;
