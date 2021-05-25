const RecipesModel = require('../models/RecipesModel');
const RecipesSchema = require('../schemas/RecipesSchema');

const create = async (userId, name, ingredients, preparation) => {
  const validRecipesData = RecipesSchema
    .validRecipesData(name, ingredients, preparation);
  if (validRecipesData.message) return validRecipesData;

  const recipe = await RecipesModel
    .create(userId, name, ingredients, preparation);
  return ({ recipe });
};

const getAll = async () => {
  const recipes = await RecipesModel.getAll();
  return (recipes);
};

module.exports = {
  create,
  getAll,
};
