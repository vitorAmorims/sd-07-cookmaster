const Recipe = require('../models/recipe.js');
const { code, message } = require('../config/statusTable');

const addRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { code: code.bad_request, message: message.bad_request };
  }

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

const editRecipeById = async (recipeEdited, userId, role, id) => {
  const { name, ingredients, preparation } = recipeEdited;
  if (!name || !ingredients || !preparation) {
    return { code: code.bad_request, message: message.bad_request };
  }

  const result = await Recipe.editRecipeById(recipeEdited, userId, role, id);

  return { code: code.ok, result };
};

const deleteRecipeById = async (userId, role, id) => {
  const result = await Recipe.deleteRecipeById(userId, role, id);

  return { code: code.no_content, result };
};

const uploadRecipeImage = async (userId, role, id, path) => {
  const result = await Recipe.uploadRecipeImage(userId, role, id, path);

  if (!result) return { code: code.unauthorized, message: message.missing_auth };

  return { code: code.ok, result };
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadRecipeImage,
};
