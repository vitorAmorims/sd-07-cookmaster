const { Router } = require('express');

const recipesRoutes = Router();

const RecipesController = require('../controllers/RecipesController');
const ValidateToken = require('../middlewares/validateToken');

recipesRoutes.post('/', ValidateToken, RecipesController.create);
recipesRoutes.get('/', RecipesController.getAllRecipes);

module.exports = recipesRoutes;