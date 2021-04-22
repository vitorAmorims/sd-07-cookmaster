const recipesModel = require('../models/recipesModel');

const createRecipe = async (userId, name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { invalidMessage: 'Invalid entries. Try again.' };
  }
  
  const validRecipe = await recipesModel.createRecipe(userId, name, ingredients, preparation);

  return validRecipe;
};

const getRecipeById = async (id) => {
  const recipeById = await recipesModel.getRecipeById(id);
  
  if (!recipeById) return { notFound: 'recipe not found' };

  return recipeById;
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await recipesModel.deleteRecipe(id);
  
  if (!deletedRecipe) return { notFound: 'recipe not found' };

  return deletedRecipe;
};

module.exports = {
  createRecipe,
  getRecipeById,
  deleteRecipe,
};
