const recipesModel = require('../models/recipesModel');

const createRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { message: 'Invalid entries. Try again.', code: 400 };
  }
  return recipesModel.create(name, ingredients, preparation);
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAll();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipeFound = await recipesModel.getById(id);
  if (recipeFound === null) {
    return { message: 'recipe not found', code: 404 };
  }
  return recipeFound;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};