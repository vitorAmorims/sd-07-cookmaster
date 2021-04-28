const { getAllRecipes } = require('../Models/Recipes/getAllRecipes');
const { getRecipeById } = require('../Models/Recipes/getRecipeById');

const getAllReicipesService = async () => getAllRecipes();

const getRecipeByIdService = async (id) => getRecipeById(id);

module.exports = {
    getAllReicipesService,
    getRecipeByIdService,
    
};