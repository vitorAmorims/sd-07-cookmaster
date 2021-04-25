const express = require('express');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { 
    createNewRecipe, 
    showAllRecipes, 
    showRecipeById,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

const recipeRouters = express.Router();

recipeRouters.get('/', showAllRecipes);
recipeRouters.get('/:id', showRecipeById);
recipeRouters.post('/', tokenValidation, createNewRecipe);
recipeRouters.put('/:id', tokenValidation, updateRecipe);
recipeRouters.delete('/:id', deleteRecipe);

module.exports = recipeRouters;