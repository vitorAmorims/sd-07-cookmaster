const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const services = require('../services');

const recipesRoutes = express.Router();

recipesRoutes.post('/recipes',
  middleware.jwtMiddleware,
  controller.recipesController.addRecipeController);

recipesRoutes.get('/recipes', controller.recipesController.getAllRecipesController);

recipesRoutes.route('/recipes/:id')
  .get(controller.recipesController.getRecipesByIdController)
  .put(middleware.jwtMiddleware, controller.recipesController.updateRecipeController)
  .delete(middleware.jwtMiddleware, controller.recipesController.deleteRecipeController);

recipesRoutes.route('/recipes/:id/image')
  .put(middleware.jwtMiddleware,
    services.uploadService(),
    controller.recipesController.addImageController);
recipesRoutes.use(middleware.errorsMiddleware);

module.exports = recipesRoutes;
