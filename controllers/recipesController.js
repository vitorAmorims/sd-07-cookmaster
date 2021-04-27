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

module.exports = {
  createNewRecipes,
};