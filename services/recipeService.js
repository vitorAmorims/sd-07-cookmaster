const RecipesModel = require('../models/recipesModel');
const UsersModel = require('../models/usersModel');
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

const updateRecipe = async (recipe) => {
  const { id, name, ingredients, preparation } = recipe;
  await validateName(name);
  await validateIngredients(ingredients);
  await validadePreparation(preparation);
  await getRecipeById(id);
  return RecipesModel.update(id, name, ingredients, preparation);
};

const removeRecipe = async (id, userID) => {
  const recipe = await getRecipeById(id);
  const user = await UsersModel.findUserById(userID);
  const { _id: idUser, role } = user;
  if (role !== 'admin' && recipe.userId.toString() !== idUser.toString()) {
    throw error.invalidUser;
  }
  return RecipesModel.exclude(id);
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
};
