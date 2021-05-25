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
  return recipes;
};

const findById = async (id) => {
  if (id.length !== 24) return ({ code: 404, message: 'recipe not found' });

  const recipe = await RecipesModel.findById(id);
  if (!recipe) return ({ code: 404, message: 'recipe not found' });

  return ({ recipe });
};

module.exports = {
  create,
  getAll,
  findById,
};
