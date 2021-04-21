const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const cryptography = require('../../helpers/cryptography');
const recipeService = require('./recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const { id: userId } = cryptography.getDataByToken(token);
  const createdRecipe = await recipeService.create(name, ingredients, preparation, userId);
  if (createdRecipe) {
    res.status(StatusCodes.CREATED).json({ recipe: createdRecipe });
  }
};

const findAllRecipes = async (_req, res) => {
  const allRecipes = await recipeService.findAll();
  res.status(StatusCodes.OK).json(allRecipes);
};

const findRecipeById = async (req, res) => {
  const { id } = req.params;

  const foundRecipe = await recipeService.findById(id);
  if (foundRecipe) {
    return res.status(StatusCodes.OK).json(foundRecipe);
  }
  throw new ErrorHandler(
    StatusCodes.NOT_FOUND,
    'recipe not found',
  );
};

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeById,
};
