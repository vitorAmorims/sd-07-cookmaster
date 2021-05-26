const recipesModel = require('../model/recipes');

const register = (recipe) => recipesModel.register(recipe);

module.exports = {
  register,
};