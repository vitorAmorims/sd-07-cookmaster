const codes = require('./codes');
const recipes = require('../models/recipesModel');

const getAllRecipes = async () => {
    const result = await recipes.getAllRecipes();
    return result;
};

const getById = async (id) => {
    const result = await recipes.getById(id);

    if (!result) return { statusCode: codes.notFound, message: 'recipe not found' };

    return result;
};

const registerRecipe = async (name, ingredients, preparation) => {
    const result = await recipes.registerRecipe(name, ingredients, preparation);
    return result;
};

module.exports = {
    registerRecipe,
    getAllRecipes,
    getById,
};