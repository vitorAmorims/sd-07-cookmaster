/** @format */

const {
  createRecipe,
  findAllRecipe,
  findRecipeId,
  upRecipe,
  deleteRecipe,
} = require('../models');

const getIdRecipes = async (id) => findRecipeId(id);
const getRecipes = async () => findAllRecipe();
const upRecipes = async (id, name, ingredients, preparation) =>
  upRecipe(id, name, ingredients, preparation);

const createRecipes = async (name, ingredients, preparation, userId) =>
  createRecipe(name, ingredients, preparation, userId);

module.exports = {
  createRecipes,
  getRecipes,
  getIdRecipes,
  upRecipes,
  deleteRecipes,
};
