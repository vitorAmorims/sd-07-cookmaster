const route = require('express').Router();
const { verifyData, verifyToken, verifyAuth } = require('../../middlewares/recipes');
const { createRecipe, 
    getRecipes, getRecipe, editRecipe, deleteRecipe } = require('../../controllers/recipes');

route.post('/', verifyData, verifyToken, createRecipe);
route.get('/', getRecipes);
route.get('/:id', getRecipe);
route.put('/:id', verifyAuth, editRecipe);
route.delete('/:id', verifyAuth, deleteRecipe);

module.exports = route;