const express = require('express');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { recipeNullCampsValidation } = require('../middlewares/recipeNullCampsValidation');
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
recipeRouters.post('/', recipeNullCampsValidation, tokenValidation, createNewRecipe);
recipeRouters.put('/:id', recipeNullCampsValidation, tokenValidation, updateRecipe);
recipeRouters.delete('/:id', deleteRecipe);

module.exports = recipeRouters;