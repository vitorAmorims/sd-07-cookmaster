const { createRecipe, findRecipes, findRecipesById } = require('../models/ModelRecipes');

async function createNewRecipe(data) {
  const [result] = await createRecipe(data);
  return { recipe: result };
}

const getRecipesList = async () => {
  const result = await findRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const result = await findRecipesById(id);
  return result;
};

module.exports = {
  createNewRecipe,
  getRecipesList,
  getRecipeById,
};
