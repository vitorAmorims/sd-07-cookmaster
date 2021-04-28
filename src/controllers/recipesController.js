const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const INTERNAL_SERVER_ERROR = 500;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const result = await recipesService.createRecipe(name, ingredients, preparation);
    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(CREATED).json({ recipe: { ...result, userId: _id } });
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const results = await recipesService.getAllRecipes();

    res.status(OK).json(results);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesService.getRecipeById(id);

  if (result.code) {
      return res.status(result.code).json(result);
    }
    res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const result = await recipesModel.update(id, name, ingredients, preparation);
    return res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await recipesModel.exclude(id);
    return res.status(NO_CONTENT).send();
  } catch (error) {
    console.error(error);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};