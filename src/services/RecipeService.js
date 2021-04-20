const RecipeModel = require('../models/RecipeModel');

async function create(name, ingredients, preparation, userId) {
  const [recipe] = await RecipeModel.create(name, ingredients, preparation, userId);
  return recipe;
}

module.exports = {
  create,
};
