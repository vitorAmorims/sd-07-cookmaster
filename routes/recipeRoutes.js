const { Router } = require('express');

const { insertRecipeCtrl } = require('../src/controller');

const recipeRoutes = Router();

recipeRoutes.post('/', insertRecipeCtrl);

module.exports = recipeRoutes;
