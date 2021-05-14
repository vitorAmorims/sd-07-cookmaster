const { recipesModel } = require('../models');
const {
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

module.exports = {
  creatRecipe,
};
