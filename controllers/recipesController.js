const { Router } = require('express');
const {
  addValidations,
  validatingId,
  updateValidation,
  removeValidation } = require('../middlewares/recipeMiddleware');

const routes = Router();

const recipeService = require('../services/recipesService');

routes.post('/', addValidations, recipeService.addRecipe);
routes.get('/', recipeService.getAll);
routes.get('/:id', validatingId, recipeService.getById);
routes.put('/:id', updateValidation, recipeService.updateById);
routes.delete('/:id', removeValidation, recipeService.removeById);

module.exports = routes;