const CODES = require('../configurations/statusCodes');
const Services = require('../services');

const createNewRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  try {
    const recipe = await Services.createNewRecipes(authorization, name, ingredients, preparation);
    res.status(CODES.CREATED).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const sales = await Services.getAllRecipes();
    res.status(CODES.OK).json(sales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewRecipes,
  getAllRecipes,
};