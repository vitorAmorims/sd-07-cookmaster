const { Router } = require('express');
const { authMiddleware } = require('../middlewares');

const { insRecipeCtrl } = require('../src/controller');

const recipeRoutes = Router();

console.log('recipeRoutes');

recipeRoutes.post('/', authMiddleware, insRecipeCtrl);

module.exports = recipeRoutes;
