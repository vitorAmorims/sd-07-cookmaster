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

const editRecipe = async (req, res) => {
  const { params, user, body } = req;
  try {
    const { _id: userId } = user;
    const { id } = params;
    const editedRecipe = await recipesServices.editRecipe(id, body, userId);
    res.status(StatusCodes.OK).send(editedRecipe);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await recipesServices.deleteRecipe(id);
  res.status(StatusCodes.NO_CONTENT).send();
};

const postRecipeImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const url = `localhost:3000/images/${filename}`;
  const recipe = await recipesServices.uploadRecipeImage(id, url);
  return res.status(StatusCodes.OK).send(JSON.stringify(recipe));
};

module.exports = {
  postRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  postRecipeImage,
};
