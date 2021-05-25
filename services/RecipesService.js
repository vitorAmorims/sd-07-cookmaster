const RecipesModel = require('../models/RecipesModel');
const RecipesSchema = require('../schemas/RecipesSchema');

const recipeNotFoundMessage = { code: 404, message: 'recipe not found' };
const noRecipeDeletedMessage = { code: 404, message: 'User no have recipe / recipe not found' };

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
  if (id.length !== 24) return (recipeNotFoundMessage);

  const recipe = await RecipesModel.findById(id);
  if (!recipe) return (recipeNotFoundMessage);

  return ({ recipe });
};

const updateById = async (id, name, ingredients, preparation) => {
  if (id.length !== 24) return (recipeNotFoundMessage);

  const validRecipe = await RecipesModel.findById(id);
  if (!validRecipe) return (recipeNotFoundMessage);

  const recipe = await RecipesModel.updateById(id, name, ingredients, preparation);
  return ({ recipe });
};

const deleteById = async (id, userId, role) => {
  let recipeDeleted;
  
  switch (role) {
    case ('user'):
      recipeDeleted = await RecipesModel.deleteByIdUser(id, userId);
      break;
    case ('admin'):
      recipeDeleted = await RecipesModel.deleteByIdAdmin(id);
      break;
    default: break;
  }

  if (recipeDeleted === 0) return (noRecipeDeletedMessage);

  return {};
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
