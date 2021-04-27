const RecipesService = require('../services/RecipesService');

const SUCESS = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await RecipesService.create(name, ingredients, preparation, _id);
    return res.status(CREATED).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const recipes = await RecipesService.getAllRecipes();
    return res.status(SUCESS).json(recipes);
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {  
  try {
    console.log('entrou na rota');
    const { id } = req.params;
    const recipe = await RecipesService.getRecipeById(id);
    return res.status(SUCESS).json(recipe);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAllRecipes, getRecipeById };