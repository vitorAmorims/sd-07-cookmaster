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

const update = async (id, name, ingredients, preparation) => {
    const recipe = await RecipesModel.update(id, name, ingredients, preparation);
    return recipe;
};

const exclude = async (id) => {
    await RecipesModel.exclude(id);
};

const uploadImage = async (id) => {
    const uploaded = await RecipesModel.uploadImage(id);
    console.log(uploaded, 'service');
    return uploaded;
};

module.exports = { create, getAllRecipes, getRecipeById, update, exclude, uploadImage };