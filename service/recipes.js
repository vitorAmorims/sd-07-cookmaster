const { ObjectId } = require('mongodb');
const { createRecipe,
  getAllRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
} = require('../models/recipes');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new Error('Invalid entries. Try again.');
  }
  return null;
};

const createRecipeService = async (recipe, payload) => {
  const { name, ingredients, preparation } = recipe;
  validateRecipe(name, ingredients, preparation);

  const createdRecipe = createRecipe(recipe, payload);
  return createdRecipe;
};

const getAllRecipesService = async () => {
  const listOfRecipes = await getAllRecipes();

  return listOfRecipes;
};

const getRecipesByIdService = async (id) => {
  const recipe = await getRecipesById(id);
  const isvalidId = ObjectId.isValid(id);

  if (recipe === null || recipe === undefined || !isvalidId) {
    throw new Error('recipe not found');
  }

  return recipe;
};

const updateRecipeService = async (id, name, ingredients, preparation) => {
  const recipeToUpdate = await updateRecipe(id, name, ingredients, preparation);

  return recipeToUpdate;
};

const deleteRecipeService = async (id) => {
  const deletedRecipe = await deleteRecipe(id);

  return deletedRecipe;
};

module.exports = {
  createRecipeService,
  getAllRecipesService,
  getRecipesByIdService,
  updateRecipeService,
  deleteRecipeService,
};