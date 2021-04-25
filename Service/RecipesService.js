const modelRecipes = require('../Model/RecipesModel');

const ERR_MESSAGE = 'Invalid entries. Try again.';

const validateName = (name) => {
  if (!name) {
    throw new Error(ERR_MESSAGE);
  }
};

const validateIngredients = (ingredients) => {
  if (!ingredients) {
    throw new Error(ERR_MESSAGE);
  }
};

const validatePreparation = (preparation) => {
  if (!preparation) {
    throw new Error(ERR_MESSAGE);
  }
};

const createRecipe = async (id, name, ingredients, preparation) => {
  validateName(name);
  validateIngredients(ingredients);
  validatePreparation(preparation);
  const result = await modelRecipes.createRecipe(id, name, ingredients, preparation);
  return result;
};

const getAllRecipes = async () => {
  const recipes = await modelRecipes.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await modelRecipes.getRecipesById(id);
  return recipe;
};

const updateRecipe = async (objParams) => {
  await modelRecipes.editdata(objParams);
  const updatedRecipe = {
    _id: objParams.idRecipe,
    name: objParams.name,
    ingredients: objParams.ingredients,
    preparation: objParams.preparation,
    userId: objParams.userId,
  };
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  await modelRecipes.deletedata(id);
};

const insertImageRecipe = async (objParams) => {
  await modelRecipes.editDataWithPatch(objParams);  
  return objParams;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImageRecipe,
};