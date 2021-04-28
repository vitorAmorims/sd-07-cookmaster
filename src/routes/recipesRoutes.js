const { Router } = require('express');

const recipesRoutes = Router();

const RecipesController = require('../controllers/RecipesController');
const ValidateToken = require('../middlewares/validateToken');

recipesRoutes.post('/', ValidateToken, RecipesController.create);
recipesRoutes.get('/', RecipesController.getAllRecipes);
recipesRoutes.get('/:id', RecipesController.getRecipeById);
recipesRoutes.put('/:id', ValidateToken, RecipesController.update);
recipesRoutes.delete('/:id', ValidateToken, RecipesController.exclude);
module.exports = recipesRoutes;