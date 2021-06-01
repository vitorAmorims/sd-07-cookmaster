const { Router } = require('express');
const { addValidations } = require('../middlewares/recipeMiddleware');

const routes = Router();

const recipeService = require('../services/recipesService');

routes.post('/', addValidations, recipeService.addRecipe);
routes.get('/', recipeService.getAll);

module.exports = routes;