const recipesModel = require('../Models/recipesModel');

const createRecipes = async (name, ingredients, preparation, userId) => 
  recipesModel.createRecipes(name, ingredients, preparation, userId);

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const result = await recipesModel.getRecipeById(id);
  const errorMessage = { message: 'recipe not found' };
  const { _id } = result;
  if (_id) return result;
  throw errorMessage;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};
