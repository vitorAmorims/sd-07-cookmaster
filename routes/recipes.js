const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const recipesRouter = express.Router();

recipesRouter.route('/')
  .get(controller.recipes.getAll)
  .post(middleware.validation.JWT, middleware.validation.recipes, controller.recipes.create);

recipesRouter.route('/:id')
  .get(controller.recipes.getById);

recipesRouter.use(middleware.errorHandler);

module.exports = recipesRouter;
