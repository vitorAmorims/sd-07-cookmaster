const { StatusCodes } = require('http-status-codes');
const { ServicesRecipes } = require('../services');

const createRecipe = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await ServicesRecipes.createNewRecipe(body);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const result = await ServicesRecipes.getRecipesList();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  const { body: { id } } = req;
  try {
    const result = await ServicesRecipes.getRecipeById(id);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getRecipeById,
  getRecipe,
};
