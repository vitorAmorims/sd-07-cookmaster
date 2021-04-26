const { Router } = require('express');
const { authMiddleware } = require('../middlewares');

const { getRecipeCtrl, insertRecipeCtrl } = require('../src/controller');

const recipeRoutes = Router();

console.log('recipeRoutes');

recipeRoutes.post('/', authMiddleware, insertRecipeCtrl);
recipeRoutes.get('/', getRecipeCtrl);

module.exports = recipeRoutes;
