const { Router } = require('express');
const { addValidations } = require('../middlewares/recipeMiddleware');

const routes = Router();

const recipeService = require('../services/recipesService');

routes.post('/', addValidations, recipeService.addRecipe);

module.exports = routes;