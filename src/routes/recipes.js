const Router = require('express').Router();
const { register } = require('../controller/recipes');
const { recipeInfoTest, tokenValidation } = require('../middlewares/recipes');

Router.post('/recipes', tokenValidation, recipeInfoTest, register);

module.exports = Router;