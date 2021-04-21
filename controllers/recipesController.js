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

module.exports = {
  addRecipe,
  getRecipes,
};