const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const insertRecipe = require('./insertRecipe');
const updateRecipe = require('./updateRecipe');

module.exports = {
  getRecipeById,
  getRecipes,
  insertRecipe,
  updateRecipe,
};