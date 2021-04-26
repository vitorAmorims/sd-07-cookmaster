const { REQUEST_OK, REQUEST_CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../http');
const recipesModel = require('../models/recipesModel');

const createRecipe = async (request, response) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const { _id: userId } = request.user;
    const results = await recipesModel.registerRecipe(name, ingredients, preparation, userId);
    return response.status(REQUEST_CREATED).json({ recipe: results });
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getRecipes = async (_request, response) => {
  try {
    const results = await recipesModel.findAllRecipes();
    console.log(results);
    return response.status(REQUEST_OK).json(results);
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getRecipeById = async (request, response) => {
  try {
    const { id } = request.params;
    const results = await recipesModel.findRecipeById(id);
    console.log(results);
    return response.status(REQUEST_OK).json(results);
  } catch (error) {
    return response.status(NOT_FOUND).json({
      message: 'recipe not found',
    });
  }
};

const updateRecipe = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, ingredients, preparation } = request.body;
    const results = await recipesModel.updateFoundRecipe(id, name, ingredients, preparation);
    return response.status(REQUEST_OK).json(results);
  } catch (error) {
    return response.status(NOT_FOUND).json({
      message: 'recipe not found',
    });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
