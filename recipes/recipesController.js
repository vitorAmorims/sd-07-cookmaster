const { StatusCodes } = require('http-status-codes');
const recipesService = require('./recipesService');

const NOT_FOUND = 'recipe not found';
const recipeId = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const image = req.file;
    const newPatch = `localhost:3000/images/${image.filename}`;
    const data = { image: newPatch };
    const updateRecipe = await recipesService.updateRecipeService(id, data);
    return res.status(StatusCodes.OK).json(updateRecipe);
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

const queryRecipeController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const queryController = await recipesService.queryRecipeService(id);
    if (!queryController) {
      return next(
        { status: StatusCodes.NOT_FOUND, message: NOT_FOUND },
      );
    }
    return res.status(StatusCodes.OK).json(queryController);
  } catch (error) {
    console.log('queryRecipesControlles', error.message);
    throw new Error(error);
  }
};

const updateRecipeController = async (req, res, _next) => {
  const data = req.body;
  const { _id: userIdent, role } = req.user;
  console.log(`user ${userIdent}, ${role}`);
  try {
    const updateRecipe = await recipesService.updateRecipeService(data);
    return res.status(StatusCodes.OK).json(updateRecipe);
    } catch (error) {
    console.log('updateRecipesControlles', error.message);
    throw new Error(error);
  }
};

const excludeRecipeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queryRecipe = await recipesService.queryRecipeService(id);
    if (!queryRecipe) {
      return next(
        { status: StatusCodes.NOT_FOUND, message: NOT_FOUND },
      );
    }
    const exclude = await recipesService.excludeRecipeService(id);
    return res.status(StatusCodes.NO_CONTENT).json(exclude);
  } catch (error) {
    console.log(error);
    throw new Error(error);  
  }
};

module.exports = {
  recipeId,
  addRecipeController,
  queryRecipesController,
  queryRecipeController,
  updateRecipeController,
  excludeRecipeController,
};
