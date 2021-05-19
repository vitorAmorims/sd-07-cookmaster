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

const editRecipe = async (editedRecipe) => {
  const recipeEdited = await recipesModel.editRecipe(editedRecipe);
  return recipeEdited;
};

const deletRecipe = async (id) => {
  const deletedRecipe = await recipesModel.deletRecipe(id);
  return deletedRecipe;
};

module.exports = {
  editRecipe,
  deletRecipe,
  creatRecipe,
  getAllRecipes,
  getRecipesById,
};
