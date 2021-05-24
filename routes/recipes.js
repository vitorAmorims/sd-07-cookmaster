const express = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');

const recipesRouter = express.Router();

recipesRouter.route('/')
  .post(middleware.validation.JWT, middleware.validation.recipes, controller.recipes.create);

recipesRouter.use(middleware.errorHandler);

module.exports = recipesRouter;
