const Recipe = require('../models/recipeModel');
const recipeService = require('../services/recipeService');

const CREATED = 201;

const getAllRecipes = async (req, res) => {
  try {
  const results = await Recipe.getAllRecipes();
  
  return res.status(200).json(results);
  } catch (err) {
  return res.status(500).json({ message: err.message });
  }
  };

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  try {
    if (!name || !ingredients || !preparation) {
      throw Error('Invalid entries. Try again.');
    }
    const newRecipe = await Recipe.registerRecipe(name, ingredients, preparation, userId);
    return res.status(CREATED).json({ recipe: newRecipe });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
try {
  const { id } = req.params;
  const result = await Recipe.getRecipeById(id);

  if (!result) throw Error('recipe not found');

  return res.status(200).json(result);
} catch (err) {
  return res.status(404).json({ message: err.message });
}
};

const editRecipeById = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const { _id: userId, role } = req.user;
  const result = await recipeService.verifyPermission(recipeId, userId, role);
  if (result) {
    const editedRecipe = await Recipe.editRecipeById(recipeId, name, ingredients, preparation);
    return res.status(200).json(editedRecipe);
  }
};

const deleteRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { _id: userId, role } = req.user;
  const result = await recipeService.verifyPermission(recipeId, userId, role);
  if (result) {
    await Recipe.deleteRecipeById(recipeId);
    return res.status(204).end();
  }
};

module.exports = {
  getAllRecipes,
  addRecipe,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
};