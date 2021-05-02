const recipesModel = require('./recipesModel');

const addRecipeService = async (newRecipe, userId) => {
  const regRecipeService = await recipesModel.regRecipeModel(newRecipe, userId);
  return { recipe: regRecipeService };
};

const queryRecipesService = async () => {
  const queryService = await recipesModel.queryRecipesModel();
  return queryService;
};

const queryRecipeService = async (id) => {
  const queryService = await recipesModel.queryRecipeModel(id);
  return queryService;
};

const updateRecipeService = async (id, data) => {
  const updateRecipe = await recipesModel.updateRecipetModel(id, data);
  return updateRecipe;
};

module.exports = {
  addRecipeService,
  queryRecipesService,
  queryRecipeService,
  updateRecipeService,
};