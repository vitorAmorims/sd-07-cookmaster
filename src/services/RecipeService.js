const RecipeModel = require('../models/RecipeModel');

async function create(name, ingredients, preparation, userId) {
  const [recipe] = await RecipeModel.create(name, ingredients, preparation, userId);
  return recipe;
}

async function index() {
  return RecipeModel.index();
}

module.exports = {
  index,
  create,
};
