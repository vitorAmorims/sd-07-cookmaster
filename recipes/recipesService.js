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
  console.log(queryService);
  return queryService;
};

module.exports = {
  addRecipeService,
  queryRecipesService,
  queryRecipeService,
};