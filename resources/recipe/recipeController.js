const { StatusCodes } = require('http-status-codes');

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

module.exports = {
  createRecipe,
};
