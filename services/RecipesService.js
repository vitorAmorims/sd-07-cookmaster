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

module.exports = {
  create,
};
