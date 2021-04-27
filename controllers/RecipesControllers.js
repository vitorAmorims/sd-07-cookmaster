const { ObjectId } = require('mongodb');
const { errorMessage, CREATED, OK, NOT_FOUND } = require('../config/httpCodes');
const {
  addRecipe: modelAddRecipe,
  getAllRecipes: modelGetAllRecipes,
  getRecipeById: modelGetRecipeById,
  updateRecipe: modelUpdateRecipe,
} = require('../models/RecipesModels');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    // source: https://github.com/tryber/sd-07-cookmaster/blob/felipe-nascimento-cookmaster/src/controllers/recipesController.js#L6

    const userId = res.locals.id;
    const result = await modelAddRecipe(name, ingredients, preparation, userId);
    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const results = await modelGetAllRecipes();
    return res.status(OK).json(results);
  } catch (error) {
    console.error(error);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const error = errorMessage;
    error.message = 'recipe not found';
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json(error);
    const result = await modelGetRecipeById(id);
    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const userId = res.locals.id;
    const id = res.params;
    const result = await modelUpdateRecipe(recipe, userId, id);
    return res.status(OK).json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};