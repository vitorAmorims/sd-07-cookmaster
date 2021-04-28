const { getAllRecipes } = require('../Models/Recipes/getAllRecipes');
const { getRecipeById } = require('../Models/Recipes/getRecipeById');
const { updateRecipe } = require('../Models/Recipes/updateRecipe');
const { deletRecipe } = require('../Models/Recipes/deleteRecipe');

const getAllReicipesService = async () => getAllRecipes();

const getRecipeByIdService = async (id) => getRecipeById(id);

const updateRecipeService = async (name, ingredients, preparation, id) =>
  updateRecipe(name, ingredients, preparation, id);

const deleteRecipeService = async (id) => deletRecipe(id);

module.exports = {
  getAllReicipesService,
  getRecipeByIdService,
  updateRecipeService,
  deleteRecipeService,
};
