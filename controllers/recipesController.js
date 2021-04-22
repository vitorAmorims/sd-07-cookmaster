const recipesModel = require('../models/recipesModel');
const recipesService = require('../services/recipesService');
const { OK, Created, BadRequest, NotFound } = require('../config/statusCode');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await recipesService.createRecipe(_id, name, ingredients, preparation);
    const { invalidMessage } = newRecipe;
    
    if (invalidMessage) return res.status(BadRequest).json({ message: invalidMessage });

    res.status(Created).json({ recipe: newRecipe });
  } catch (err) {
    throw new Error(err);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();

    res.status(OK).json(recipes);
  } catch (err) {
    throw new Error(err);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await recipesService.getRecipeById(id);
    const { notFound } = recipeById;

    if (notFound) return res.status(NotFound).json({ message: notFound });

    res.status(OK).json(recipeById);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};