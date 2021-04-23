const recipesModels = require('../models/recipesModels');
const status = require('../config/statusTable');

const noPermissions = 'no have permission';

const validateData = (ingredients, preparation, name) => {
  if (!ingredients || !preparation || !name) return false;
  return true;
};

const newRecipeValidation = async (id, name, ingredients, preparation) => {
  if (!validateData(ingredients, preparation, name)) {
    return { message: 'Invalid entries. Try again.', code: status.badRequest };
  }
  const newRecipe = await recipesModels.addRecipe(id, name, ingredients, preparation);
  return newRecipe;
};

const getRecipesValidation = async () => {
  const recipes = await recipesModels.getRecipes();
  return recipes;
};

const recipeByIdValidation = async (id) => {
  const recipe = await recipesModels.getRecipeById(id);
  if (!recipe) return { message: 'recipe not found', code: status.notFound };
  return recipe;
};

const updateByIdValidation = async (id, newData, userId, role) => {
  const recipe = await recipesModels.getRecipeById(id);
  if (recipe.userId === userId || role === 'admin') {
    const updatedRecipe = await recipesModels.updateRecipeById(id, newData, userId);
    return updatedRecipe;
  }

  return { message: noPermissions, code: status.unauthorized };
};

const excludeRecipeValidation = async (id, userId, role) => {
  const recipe = await recipesModels.getRecipeById(id);
  if (recipe.userId === userId || role === 'admin') {
    const exclude = await recipesModels.excludeRecipeById(id);
    return exclude;
  }

  return { message: noPermissions, code: status.unauthorized };
};

const uploadImageValidation = async (id, userId, role, fileName) => {
  const recipe = await recipesModels.getRecipeById(id);
  if (recipe.userId === userId || role === 'admin') {
    const imagePath = `localhost:3000/images/${fileName}`;
    const recipeWithImage = await recipesModels.uploadRecipeImage(id, imagePath, recipe);
    return recipeWithImage;
  }

  return { message: noPermissions, code: status.unauthorized };
};

module.exports = {
  newRecipeValidation,
  getRecipesValidation,
  recipeByIdValidation,
  updateByIdValidation,
  excludeRecipeValidation,
  uploadImageValidation,
};