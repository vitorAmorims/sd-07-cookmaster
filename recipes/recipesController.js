const { StatusCodes } = require('http-status-codes');
const recipesService = require('./recipesService');

const recipeId = (req, res) => {
  try {
    const { id } = req.params;
    return res.status(StatusCodes.OK).json(id);
  } catch (error) {
   return res.status(500).json({ 
     message: 'Erro ao enviar imagem',
    error: error.message,
   });
  }
};

const addRecipeController = async (req, res) => {
  const recipe = req.body;
  const { _id: userId } = req.user;
  try {
    const newRecipe = await recipesService.addRecipeService(recipe, userId);
    if (!newRecipe) return null;
    return res.status(StatusCodes.CREATED).json(newRecipe);
  } catch (error) {
    console.log('addRecipeController', error.message);
    throw new Error(error);
  }
};

const queryRecipesController = async (_req, res) => {
  try {
    const queryController = await recipesService.queryRecipesService();
    return res.status(StatusCodes.OK).json(queryController);
  } catch (error) {
    console.log('queryRecipesControlles', error.message);
    throw new Error(error);
  }
};

module.exports = {
  recipeId,
  addRecipeController,
  queryRecipesController,
};
