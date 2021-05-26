const { addRecipesModel } = require('../models/recipes');
const { nameIsRequired } = require('./users');
const { code, message } = require('../helpers/messages');

const prepAndIngredRequired = (ingredients, preparation) => {
  if (!ingredients || !preparation) {
    const error = { code: code[40], message: message.invalidEntries };
    throw error;
  }
};

const addRecipesService = async (name, ingredients, preparation) => {
  nameIsRequired(name);
  prepAndIngredRequired(ingredients, preparation);
  const newRecipe = await addRecipesModel(name, ingredients, preparation);
  return newRecipe;
};

module.exports = {
  addRecipesService,
};