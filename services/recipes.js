const modelRecipes = require('../models/recipes');

const ERR_MESSAGE = 'Invalid entries. Try again.';

const validateName = (name) => {
  if (!name) {
    throw new Error(ERR_MESSAGE);
  }
};

const validateingredients = (ingredients) => {
  if (!ingredients) {
    throw new Error(ERR_MESSAGE);
  }
};

const validatepreparation = (preparation) => {
  if (!preparation) {
    throw new Error(ERR_MESSAGE);
  }
};

const createRecipe = async (id, name, ingredients, preparation) => {
  validateName(name);
  validateingredients(ingredients);
  validatepreparation(preparation);
  const result = await modelRecipes.postdata(id, name, ingredients, preparation);
  return result;
};

const getAllRecipes = async () => {
  const recipes = await modelRecipes.getAll();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await modelRecipes.getById(id);
  return recipe;
};

const updateRecipe = async (idRecipe, name, ingredients, preparation) => {
  await modelRecipes.editdata(idRecipe, name, ingredients, preparation);
  const updatedRecipe = {
    _id: idRecipe,
    name,
    ingredients,
    preparation,
  };
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  return await modelRecipes.deletedata(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
