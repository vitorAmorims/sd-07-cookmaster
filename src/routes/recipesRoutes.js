const { Router } = require('express');

const recipesRoutes = Router();

const RecipesController = require('../controllers/RecipesController');

recipesRoutes.post('/', RecipesController.create);

module.exports = recipesRoutes;