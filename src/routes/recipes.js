const Router = require('express').Router();
const { register, getAll, getRecipe, editRecipe, deleteRecipe } = require('../controller/recipes');
const { recipeInfoTest, tokenValidation, tokenExists } = require('../middlewares/recipes');

const RECIPE_ID = '/recipes/:id';

Router.get(RECIPE_ID, getRecipe);
Router.put(
  RECIPE_ID,
  tokenExists,
  tokenValidation,
  editRecipe,
  );
  Router.delete(
    RECIPE_ID, tokenExists, tokenValidation, deleteRecipe, 
  );
Router.post('/recipes', tokenValidation, recipeInfoTest, register);
Router.get('/recipes', getAll);

module.exports = Router;