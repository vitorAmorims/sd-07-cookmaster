const recipesModel = require('../model/recipes');

const register = (recipe) => recipesModel.register(recipe);
const getAll = () => recipesModel.getAll();
const getRecipe = (id) => recipesModel.getRecipe(id);

module.exports = {
  register,
  getAll,
  getRecipe,
};