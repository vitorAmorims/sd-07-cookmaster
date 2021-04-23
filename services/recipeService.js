const RecipesModel = require('../models/recipesModel');
const error = require('../errors');

const validateName = async (name) => {
  if (typeof name !== 'string') throw error.invalidEntries;
};

const validateIngredients = async (ingredients) => {
  if (typeof ingredients !== 'string') throw error.invalidEntries;
};

const validadePreparation = async (preparation) => {
  if (typeof preparation !== 'string') throw error.invalidEntries;
};

const addRecipe = async (name, ingredients, preparation, id) => {
  await validateName(name);
  await validateIngredients(ingredients);
  await validadePreparation(preparation);
  const registeredUser = await RecipesModel.addNewRecipe(
    name,
    ingredients,
    preparation,
    id,
  );
  return registeredUser;
};

const getRecipeById = async (id) => {
  const recipeID = await RecipesModel.getById(id);
  if (!recipeID) throw error.invalidID;
  return recipeID;
};

const getRecipes = () => RecipesModel.getAllRecipes();

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
};
