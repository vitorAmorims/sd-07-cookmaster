const RecipesModel = require('../models/RecipesModel');
const ValidateService = require('./ValidateService');

const create = async (name, ingredients, preparation, id) => {
    ValidateService.validField(name);
    ValidateService.validField(ingredients);
    ValidateService.validField(preparation);
    const recipe = await RecipesModel.create(name, ingredients, preparation, id);
    return recipe;
};

const getAllRecipes = async () => {
    const recipes = await RecipesModel.getAllRecipes();
    return recipes;
};

const getRecipeById = async (id) => {
    const recipe = await ValidateService.validRecipeId(id);
    return recipe;
};

module.exports = { create, getAllRecipes, getRecipeById };