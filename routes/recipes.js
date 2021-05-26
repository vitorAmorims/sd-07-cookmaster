const express = require('express');
const middleware = require('../middlewares');

const controller = require('../controllers');

const recipesRouter = express.Router();

recipesRouter.route('/')
  .get(controller.recipes.getAll)
  .post(middleware.validation.JWT, middleware.validation.recipes, controller.recipes.create);

recipesRouter.route('/:id')
  .get(controller.recipes.getById)
  .put(middleware.validation.JWT, controller.recipes.update)
  .delete(middleware.validation.JWT, controller.recipes.exclude);

recipesRouter.route(':id/image')
  .put(middleware.validation.JWT, controller.recipes.addImage, middleware.errorHandler);

recipesRouter.use(middleware.errorHandler);

module.exports = recipesRouter;
