const { getAllRecipes } = require('../Models/Recipes/getAllRecipes');
const { getRecipeById } = require('../Models/Recipes/getRecipeById');
const { updateRecipe } = require('../Models/Recipes/updateRecipe');

const getAllReicipesService = async () => getAllRecipes();

const getRecipeByIdService = async (id) => getRecipeById(id);

const updateRecipeService = async (name, ingredients, preparation, id) =>
  updateRecipe(name, ingredients, preparation, id);

module.exports = {
  getAllReicipesService,
  getRecipeByIdService,
  updateRecipeService,
};
