const Recipe = require('../../models/RecipeModel');
const { code, message } = require('../../auth/StatusCodes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { code: code.bad_request, message: message.bad_request };
  }

  const result = await Recipe.createRecipe(name, ingredients, preparation, userId);

  return { code: code.created, result };
};

const getAllRecipes = async () => {
  const result = await Recipe.getAllRecipes();

  return { code: code.ok, result };
};

const getIdRecipes = async (id) => {
  const result = await Recipe.getIdRecipes(id);

  if (!result) return { code: code.not_found, message: message.recipe_not_found };

  return { code: code.ok, result };
};

const editRecipe = async (recipeEdited, userId, role, id) => {
  const { name, ingredients, preparation } = recipeEdited;
  if (!name || !ingredients || !preparation) {
    return { code: code.bad_request, message: message.bad_request };
  }

  const result = await Recipe.editRecipe(recipeEdited, userId, role, id);

  return { code: code.ok, result };
};

const deleteRecipe = async (userId, role, id) => {
  const result = await Recipe.deleteRecipe(userId, role, id);

  return { code: code.no_content, result };
};

const addImage = async (userId, role, id, path) => {
  const result = await Recipe.addImage(userId, role, id, path);

  if (!result) return { code: code.unauthorized, message: message.missing_auth };

  return { code: code.ok, result };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getIdRecipes,
  editRecipe,
  deleteRecipe,
  addImage,
};