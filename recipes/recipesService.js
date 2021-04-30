const recipesModel = require('./recipesModel');

const addRecipeService = async (newRecipe, userId) => {
  const regRecipeService = await recipesModel.regRecipeModel(newRecipe, userId);
  console.log('regRecipeService', regRecipeService);
  return { recipe: regRecipeService };
};

module.exports = {
  addRecipeService,
};