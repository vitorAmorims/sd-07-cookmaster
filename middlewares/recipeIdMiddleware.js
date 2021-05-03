const { ObjectId } = require('bson');
const service = require('../services/recipeService');
const { recipeNotFound } = require('../messages');

const recipeIdMiddleware = async (request, response, next) => {
  const { id } = request.params;
  try {
    ObjectId(id);
    const recipe = await service.findRecipeById(id);
    if (recipe) next();  
  } catch (error) {
    return response.status(404).json({ message: recipeNotFound });
  }
};

module.exports = recipeIdMiddleware;