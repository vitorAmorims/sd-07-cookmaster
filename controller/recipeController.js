const { StatusCodes } = require('http-status-codes');
const recipeService = require('../service/recipeService');
const recipeModel = require('../model/recipeModel');

const insertNewRecipe = async ({ body, user }, res) => {
  const { _id } = user;
  try {
    const result = await recipeService.insertNewRecipe(body, _id);
    res.status(StatusCodes.CREATED).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

const findAllRecipes = async (req, res) => {
  const result = await recipeModel.findAllRecipes();
  return res.status(StatusCodes.OK).send(result);
};

const findRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await recipeService.findRecipeById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.NOT_FOUND).send({ message });
  }
};

const updateRecipeById = async ({ params, user, body }, res) => {
  const { id } = params;
  const { _id: authorId } = user;
  try {
    const result = await recipeService.updateRecipeById(id, body, authorId);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).send({ message });
  }
};
module.exports = {
  insertNewRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipeById,
};
