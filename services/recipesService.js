const recipesModel = require('../models/recipesModel');

const validateName = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

const validateIngredients = (ingredients) => {
  if (!ingredients) {
    return false;
  }
  return true;
};

const validatePreparation = (preparation) => {
  if (!preparation) {
    return false;
  }
  return true;
};

const createRecipes = async (name, ingredients, preparation) => {
  if (!validateName(name)
    || !validateIngredients(ingredients)
    || !validatePreparation(preparation)) {
    return {
      erro: {
        message: 'Invalid entries. Try again.', status: 400,
      },
    };
  }

  const recipes = await recipesModel.createRecipes(name, ingredients, preparation);
  console.log('recipesModel', recipes);
  return recipes;
};

module.exports = {
  createRecipes,
};
