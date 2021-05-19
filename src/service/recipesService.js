const { recipesModel } = require('../models');
const {
  idValidate,
  nameValidate,
  preparetionValidate,
  ingredientsValidate,
} = require('../validations');

const creatRecipe = async (recipe) => {
  const { name, ingredients, preparation } = recipe;
  nameValidate(name);
  ingredientsValidate(ingredients);
  preparetionValidate(preparation);
  const createdRecipe = await recipesModel.creatRecipe(recipe);
  return createdRecipe;
};

const getAllRecipes = async () => {
  const recipesListed = await recipesModel.getAllRecipes();
  return recipesListed;
};

const getRecipesById = async (id) => {
  idValidate(id);
  const recipeFound = await recipesModel.getRecipesById(id);
  return recipeFound;
};

module.exports = {
  creatRecipe,
  getAllRecipes,
  getRecipesById,
};
