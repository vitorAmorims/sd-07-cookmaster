const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const recipesRoutes = express.Router();

recipesRoutes.post('/recipes',
  middleware.jwtMiddleware,
  controller.recipesController.addRecipeController);

recipesRoutes.get('/recipes', controller.recipesController.getAllRecipesController);

recipesRoutes.route('/recipes/:id')
  .get(controller.recipesController.getRecipesByIdController);

recipesRoutes.use(middleware.errorsMiddleware);

module.exports = recipesRoutes;
