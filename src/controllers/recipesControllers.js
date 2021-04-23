const {
  handleNewRecipe,
  handleRecipeById,
  handleUpdateRecipeById,
  handleDeleteRecipeById,
} = require('../services/recipesServices');
const { allRecipes } = require('../models/recipesModels');

const ERROR = 500;
const SUCCESS = 200;

const saveRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const { http, message } = await handleNewRecipe(name, ingredients, preparation, token);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const result = await allRecipes();
    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { http, message } = await handleRecipeById(id);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const bodyParams = req.body;
    const { http, message } = await handleUpdateRecipeById(id, token, bodyParams);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const { http, message } = await handleDeleteRecipeById(id, token);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

module.exports = {
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
