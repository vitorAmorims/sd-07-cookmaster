const express = require('express');
const { authMiddleware } = require('../middlewares');
const { recipesController } = require('../controllers');

const route = express.Router();

const RECIPES = 'recipes';

// (_, res) => { res.send('deu bom'); }
route.post(`/${RECIPES}`, authMiddleware.checkIfTheUserIsAuthenticated,
  recipesController.recipesRegistration);
route.get(`/${RECIPES}`, recipesController.getAllRecipes);
route.get(`/${RECIPES}/:id`, recipesController.getRecipe);
route.put(`/${RECIPES}/:id`, authMiddleware.checkIfTheUserIsAuthenticated,
  recipesController.updateRecipe);
route.delete(`/${RECIPES}/:id`, authMiddleware.checkIfTheUserIsAuthenticated,
  recipesController.deleteRecipe);

module.exports = route;
