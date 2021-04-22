const { Router } = require('express');

const { insRecipeCtrl } = require('../src/controller');

const recipeRoutes = Router();

recipeRoutes.post('/', insRecipeCtrl);

module.exports = recipeRoutes;
