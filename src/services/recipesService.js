const codes = require('./codes');
const recipes = require('../models/recipesModel');

const messageNOtFound = 'recipe not found';

const getAllRecipes = async () => {
    const result = await recipes.getAllRecipes();
    return result;
};

const getById = async (id) => {
    const result = await recipes.getById(id);
    if (!result) return { statusCode: codes.notFound, message: messageNOtFound };
    return result;
};

const editRecipe = async (id, name, ingredients, preparation) => {
    const result = await recipes.editRecipe(id, name, ingredients, preparation);
    if (!result) return { statusCode: codes.notFound, message: messageNOtFound };
    return result;
};

const deleteRecipe = async (id) => {
    const result = await recipes.deleteRecipe(id);
    if (!result) return { statusCode: codes.notFound, message: messageNOtFound };
    return result;
};

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const result = await recipes.registerRecipe(name, ingredients, preparation, userId);
    return result;
};

module.exports = {
    registerRecipe,
    getAllRecipes,
    getById,
    editRecipe,
    deleteRecipe,
};