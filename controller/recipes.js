const rec = require('../services/recipes');
const { code } = require('../helpers/messages');
const { deleteRecipeModel } = require('../models/recipes');

const addRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipe = await rec.addRecipesService(name, ingredients, preparation);
    res.status(code[21]).json({ recipe });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await rec.getAllRecipesService();
    res.status(code[20]).json(recipes);
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await rec.getByIdService(id);
    res.status(code[20]).json(recipe);
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

const editRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    console.log('editRecipe', req.body);
    const editRecipe = await rec.editRecipeService(id, name, ingredients, preparation);
    res.status(code[20]).json(editRecipe);
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const deleted = await deleteRecipeModel(id);
    console.log({ deleted });
    res.status(code[24]).end();
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

module.exports = { addRecipes, getAllRecipes, getById, editRecipes, deleteRecipe };