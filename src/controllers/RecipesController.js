const RecipesService = require('../services/RecipesService');

const SUCESS = 200;
const CREATED = 201;
const NO_RESPONSE = 204;

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
    const { id } = req.params;
    const recipe = await RecipesService.getRecipeById(id);
    return res.status(SUCESS).json(recipe);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  try {
    const updatedRecipe = await RecipesService.update(id, name, ingredients, preparation);
    return res.status(SUCESS).json(updatedRecipe);
  } catch (err) {
    next(err);
  }
};

const exclude = async (req, res, next) => {
  const { id } = req.params;
  try {
    await RecipesService.exclude(id);
    return res.status(NO_RESPONSE).end();
  } catch (err) {
    next(err);
  }
};

const uploadImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const uploaded = await RecipesService.uploadImage(id);
    console.log(uploaded, 'controller');
    return res.status(SUCESS).json(uploaded);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAllRecipes, getRecipeById, update, exclude, uploadImage };