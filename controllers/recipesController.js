const recipesServices = require('../services/recipesServices');
const status = require('../config/statusTable');

const addRecipe = async (req, res) => {
  const { id } = req.data;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await recipesServices.newRecipeValidation(id, name, ingredients, preparation);
  if (newRecipe.message) {
    return res.status(newRecipe.code).json({ message: newRecipe.message });
  }
  res.status(status.created).json({ recipe: newRecipe });
};

const getRecipes = async (req, res) => {
  const recipes = await recipesServices.getRecipesValidation();
  res.status(status.ok).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.recipeByIdValidation(id);
  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
  res.status(status.ok).json(recipe);
};

const updateRecipeById = async (req, res) => {
  const userId = req.data.id;
  const { role } = req.data;
  const { id } = req.params;
  const newData = req.body;
  const updatedRecipe = await recipesServices.updateByIdValidation(id, newData, userId, role);
  if (updatedRecipe.message) {
    return res.status(updatedRecipe.code).json({ message: updatedRecipe.message });
  }
  res.status(status.ok).json(updatedRecipe);
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipeById,
};