const {
  addRecipesModel,
  getAllRecipesModel,
  getByIdModel,
  editRecipeModel,
  deleteRecipeModel,
  uploadRecipeModel,
} = require('../models/recipes');
const { nameIsRequired } = require('./users');
const { code, message } = require('../helpers/messages');

const prepAndIngredRequired = (ingredients, preparation) => {
  if (!ingredients || !preparation) {
    const error = { code: code[40], message: message.invalidEntries };
    throw error;
  }
};

const addRecipesService = async (name, ingredients, preparation) => {
  nameIsRequired(name);
  prepAndIngredRequired(ingredients, preparation);
  const newRecipe = await addRecipesModel(name, ingredients, preparation);
  return newRecipe;
};

const getAllRecipesService = async () => {
  const getRecipes = await getAllRecipesModel();
  return getRecipes;
};

const getByIdService = async (id) => {
  const user = await getByIdModel(id);
  if (!user) {
    const error = { code: code[44], message: message.recipeNotFound };
    throw error;
  }
  return user;
};

const editRecipeService = async (id, name, ingredients, preparation) => {
  const editRecipe = await editRecipeModel(id, name, ingredients, preparation);
  console.log('service edit', editRecipe);
  return editRecipe;
};

const deleteRecipeService = async (id) => {
  const deletedRecipe = await deleteRecipeModel(id);
  return deletedRecipe;
};

const uploadImageService = async (recipe) => {
  const editRecipe = await uploadRecipeModel(recipe);
  return editRecipe;
};

module.exports = {
  addRecipesService,
  getAllRecipesService,
  getByIdService,
  editRecipeService,
  deleteRecipeService,
  deleteRecipeModel,
  uploadImageService,
};