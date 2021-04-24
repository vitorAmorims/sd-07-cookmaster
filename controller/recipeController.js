const { StatusCodes } = require('http-status-codes');
const recipeService = require('../service/recipeService');

const insertNewRecipe = async ({ body, user }, res) => {
  const { _id } = user;
  try {
    const result = await recipeService.insertNewRecipe(body, _id);
    res.status(StatusCodes.CREATED).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).json(({ message }));
  }
};

module.exports = {
  insertNewRecipe,
};