const recipeService = require('../services/recipeService');
const Recipe = require('../models/recipeModel');
const code = require('../utils/code');
const msg = require('../utils/msg');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const result = await recipeService.createRecipe(name, ingredients, preparation, _id);
    return res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const results = await Recipe.getAll();
    res.status(code.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(code.SERVER).json(msg.defaultErr);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipeService.getByIdService(id);
    res.status(result.status).json(result.msg);
  } catch (err) {
    console.error(err);
    res.status(code.SERVER).json(msg.defaultErr);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const params = { id, name, ingredients, preparation, _id };
    console.log(params);
    const result = await Recipe.update(params);
    console.log(result);
    return res.status(code.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
