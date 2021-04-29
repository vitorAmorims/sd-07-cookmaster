const Recipe = require('../models/recipe.js');
const { code, message } = require('../config/statusTable');

const addRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return { code: code.bad_request, message: message.bad_request };

  const result = await Recipe.addRecipe(name, ingredients, preparation, userId);

  return { code: code.created, result };
};

const getRecipes = async () => {
  const result = await Recipe.getRecipes();

  return { code: code.ok, result };
};

const getRecipeById = async (id) => {
  const result = await Recipe.getRecipeById(id);

  if (!result) return { code: code.not_found, message: message.recipe_not_found };

  return { code: code.ok, result };
};

const editRecipeById = async (name, ingredients, preparation, userId, role, id) => {
  if (!name || !ingredients || !preparation) return { code: code.bad_request, message: message.bad_request };

  const result = await Recipe.editRecipeById(name, ingredients, preparation, userId, role, id);

  return { code: code.ok, result };
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
};
