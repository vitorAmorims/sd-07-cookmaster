const {
  createRecipe,
  findRecipes,
  findRecipesById,
  updateById,
  deleteById,
  insertImageRecipe,
} = require('../models/ModelRecipes');

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

const updateRecipeById = async (data) => {
  const result = await updateById(data);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await deleteById(id);
  return result;
};

const insertImagedb = async (data) => {
  const result = await insertImageRecipe(data);
  return result;
};

module.exports = {
  createNewRecipe,
  getRecipesList,
  getRecipeById,
  updateRecipeById,
  deleteRecipe,
  insertImagedb,
};
