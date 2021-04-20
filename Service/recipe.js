const recipe = require('../Model/recipe');
const { validRecipe, message } = require('./recipeValidation');

const create = async (data, token) => {
  const { error } = validRecipe(data);
  if (error) throw message.invalidEntries;
  const { name, ingredients, preparation } = data;
  const { _id } = token;
  
  const response = await recipe.create(name, ingredients, preparation, _id);
  return response;
};

const getAllRecipes = async () => recipe.getAllRecipes();

const getById = async (id) => {
  const result = await recipe.getById(id);
  if (!result) throw message.recipeNotFound;
  return result;
};

module.exports = {
  create,
  getAllRecipes,
  getById,
};