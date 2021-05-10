const { StatusCodes } = require('http-status-codes');
const { ServicesRecipes } = require('../services');
const { status, validUpdateRecipes } = require('../helpers');

const createRecipe = async (req, res, next) => {
  const { body, user: { data: { _id } } } = req;
  try {
    const userId = _id;
    const recipe = { ...body, userId };
    const result = await ServicesRecipes.createNewRecipe(recipe);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const result = await ServicesRecipes.getRecipesList();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const result = await ServicesRecipes.getRecipeById(id);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const updateRecipeById = async (req, res, next) => {
  const { params: { id }, user } = req;
  try {
    const recipeReceivedDb = await ServicesRecipes.getRecipeById(id);
    if (!recipeReceivedDb) throw status.notFound;
    const { _id } = recipeReceivedDb;
    const userId = validUpdateRecipes(recipeReceivedDb, user);
    const result = await ServicesRecipes.updateRecipeById({ _id, ...req.body, userId });
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getRecipeById,
  getRecipes,
  updateRecipeById,
};
