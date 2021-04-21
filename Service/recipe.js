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

const updateRecipe = async (body, user, recipeId) => {
  const { name, ingredients, preparation } = body;
  const result = await recipe.updateRecipe(name, ingredients, preparation, recipeId);
  return result.value;
};

const deleteRecipe = async (id) => recipe.deleteRecipe(id);

const insertImage = async (id, image) => {
  const result = await recipe.insertImage(id, image);
  return result.value;
};

module.exports = {
  create,
  getAllRecipes,
  getById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};