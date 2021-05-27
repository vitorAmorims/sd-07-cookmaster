const Router = require('express').Router();
const { register, getAll, getRecipe } = require('../controller/recipes');
const { recipeInfoTest, tokenValidation } = require('../middlewares/recipes');

Router.get('/recipes/:id', getRecipe);
Router.post('/recipes', tokenValidation, recipeInfoTest, register);
Router.get('/recipes', getAll);

module.exports = Router;