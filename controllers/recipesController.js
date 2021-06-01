const { Router } = require('express');
const {
  addValidations,
  validatingId,
  updateValidation } = require('../middlewares/recipeMiddleware');

const routes = Router();

const recipeService = require('../services/recipesService');

routes.post('/', addValidations, recipeService.addRecipe);
routes.get('/', recipeService.getAll);
routes.get('/:id', validatingId, recipeService.getById);
routes.put('/:id', updateValidation, recipeService.updateById);

module.exports = routes;