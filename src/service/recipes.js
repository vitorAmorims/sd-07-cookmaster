const recipesModel = require('../model/recipes');

const register = (recipe) => recipesModel.register(recipe);
const getAll = () => recipesModel.getAll();
const getRecipe = (id) => recipesModel.getRecipe(id);
const updateRecipe = (
  id, name, ingredients, preparation,
) => recipesModel.updateRecipe(
    id, name, ingredients, preparation,
);
const deleteRecipe = (id) => recipesModel.deleteRecipe(id);
const setImage = (id, path) => recipesModel.setImage(id, path);

module.exports = {
  setImage,
  register,
  getAll,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};