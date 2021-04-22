const recipesModel = require('../Models/recipesModel');

const createRecipes = async (name, ingredients, preparation, userId) => 
  recipesModel.createRecipes(name, ingredients, preparation, userId);

module.exports = {
  createRecipes,
};
