const Recipe = require('../models/recipeModel');

const verifyPermission = async (recipeId, userId, role, entries) => {
  const foundRecipe = await Recipe.getRecipeById(recipeId);
  const isAllowed = foundRecipe.userId.toString() === userId.toString();
  if (isAllowed || role === 'admin') {
    const [name, ingredients, preparation] = entries;
    const result = await Recipe.editRecipeById(recipeId, name, ingredients, preparation);
    return result;
  }
};

module.exports = {
  verifyPermission,
};
