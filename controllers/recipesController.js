const recipesModel = require('../models/recipesModel');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const { _id: userId } = user;

    const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
    
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getAll();
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.getById(id);
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const updateItem = req.body;
    const { id } = req.params;
    const { user } = req;
    const { _id: userId } = user;

    const updtRecipe = await recipesModel.update(id, updateItem, userId);
    
    return res.status(200).json(updtRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await recipesModel.exclude(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
