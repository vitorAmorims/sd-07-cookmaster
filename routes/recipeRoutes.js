const { Router } = require('express');
const { authMiddleware } = require('../middlewares');

const { getOneRecipeCtrl, getRecipesCtrl, insertRecipeCtrl } = require('../src/controller');

const recipeRoutes = Router();

recipeRoutes.post('/', authMiddleware, insertRecipeCtrl);
recipeRoutes.get('/', getRecipesCtrl);
recipeRoutes.get('/:id', getOneRecipeCtrl);

module.exports = recipeRoutes;
