const recipeModels = require('../models/recipeModels');

const createRecipe = async (name, ingredients, preparation, id) => {
    // console.log(name);
  const response = await recipeModels.createRecipe(name, ingredients, preparation, id);
  return response;
};

module.exports = { createRecipe };
