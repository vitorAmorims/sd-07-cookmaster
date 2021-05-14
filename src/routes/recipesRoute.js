const express = require('express');
const { recipeControllers } = require('../controllers');
const { tokenValidator } = require('../middlewares');

const route = express.Router();

route.post('/recipes', tokenValidator, recipeControllers.creatRecipe);

module.exports = route;