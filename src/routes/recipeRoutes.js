const express = require('express');
const { createNewRecipe } = require('../controllers/recipeController');

const recipeRouters = express.Router();

recipeRouters.post('/', createNewRecipe);

module.exports = recipeRouters;