const { Router } = require('express');
const { authMiddleware } = require('../middlewares');

const {
  delOneRecipeCtrl,
  editRecipeCtrl,
  getOneRecipeCtrl,
  getRecipesCtrl,
  insertRecipeCtrl,
} = require('../src/controller');

const recipeRoutes = Router();

recipeRoutes.post('/', authMiddleware, insertRecipeCtrl);
recipeRoutes.put('/:id', authMiddleware, editRecipeCtrl);
recipeRoutes.get('/', getRecipesCtrl);
recipeRoutes.get('/:id', getOneRecipeCtrl);
// recipeRoutes.delete('/:id', delOneRecipeCtrl);

module.exports = recipeRoutes;
