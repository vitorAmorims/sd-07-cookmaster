const ModelRecipes = require('../models/ModelRecipes');
const status = require('./statusCodes');

const validUploadImageRecipe = async (id, user) => {
  const { _id: userId } = user;
  const findRecipeById = await ModelRecipes.findRecipesById(id);
  if (!findRecipeById) throw status.notFoundFile;
  if (user.role !== 'admin' && userId.toString() !== findRecipeById.userId.toString()) {
    throw status.isNotAdmin;
  }
};

module.exports = validUploadImageRecipe;
