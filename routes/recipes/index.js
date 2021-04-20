const route = require('express').Router();
const { verifyData, verifyToken } = require('../../middlewares/recipes');
const { createRecipe, getRecipes, getRecipe } = require('../../controllers/recipes');

route.post('/', verifyData, verifyToken, createRecipe);
route.get('/', getRecipes);
route.get('/:id', getRecipe);

module.exports = route;