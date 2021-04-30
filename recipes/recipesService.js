const recipesModel = require('./recipesModel');

const addRecipeService = async (newRecipe, userId) => {
  const regRecipeService = await recipesModel.regRecipeModel(newRecipe, userId);
  console.log('regRecipeService', regRecipeService);
  return { recipe: regRecipeService };
};

const queryRecipesService = async () => {
  const queryService = await recipesModel.queryRecipesModel();
  return queryService;
};

module.exports = {
  addRecipeService,
  queryRecipesService,
};