const { getAllRecipes } = require('../Models/Recipes/getAllRecipes');

const getAllReicipesService = async () => getAllRecipes();

module.exports = {
    getAllReicipesService,
};