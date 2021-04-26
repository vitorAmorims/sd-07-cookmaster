const Recipe = require('../models/recipeModel');

const verifyPermission = async (recipeId, userId, role) => {
  const foundRecipe = await Recipe.getRecipeById(recipeId);
  const isAllowed = foundRecipe.userId.toString() === userId.toString();
  if (isAllowed || role === 'admin') {
    return true;
  }
};

module.exports = {
  verifyPermission,
};
