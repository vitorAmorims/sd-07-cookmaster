const { StatusCodes } = require('http-status-codes');
const recipesServices = require('../services/recipesServices');

const postRecipe = async (req, res) => {
  const { body, user } = req;
  const { _id } = user;
  try {
    const response = await recipesServices.postRecipe(_id, body);
    return res.status(StatusCodes.CREATED).send(response);
  } catch ({ message }) {
    return res.status(StatusCodes.BAD_REQUEST).json(({ message }));
  }
};

const getRecipes = async (_req, res) => {
  const recipes = await recipesServices.getRecipes();
  return res.status(StatusCodes.OK).send(recipes);
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getRecipe(id);
    return res.status(StatusCodes.OK).send(recipe);
  } catch ({ message }) {
    return res.status(StatusCodes.NOT_FOUND).json({ message });
  }
};

module.exports = {
  postRecipe,
  getRecipes,
  getRecipe,
};
