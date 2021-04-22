const jwt = require('jsonwebtoken');
const recipeService = require('../services/recipiesService');
const userModel = require('../models/usersModels');

const addrecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { code, recipe, message } = await recipeService.add(name, ingredients, preparation);
  
  if (!recipe) return res.status(code).json({ message });

  const token = req.headers.authorization;
  const secret = 'senha';
  const decoded = jwt.verify(token, secret);
  const { _id: userId } = await userModel.getUserByEmail(decoded.data.email);
  const { _id } = recipe;

  res.status(code).json({ recipe: { name, ingredients, preparation, userId, _id } });
};

const getAllRecipes = async (_req, res) => {
  const { code, recipes } = await recipeService.getAll();
  
  return res.status(code).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const { code, message, recipe } = await recipeService.getById(id);
  
  if (!recipe) return res.status(code).json({ message });
  
  return res.status(code).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  
  const { code, message, recipe } = await recipeService.update(id, name, ingredients, preparation);
  if (!recipe) return res.status(code).json({ message });

  res.status(code).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const { code, message, reciepe } = await recipeService.exclude(id);

  if (!reciepe) return res.status(code).json({ message });

  res.status(code).json(reciepe);
};

module.exports = {
  addrecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};