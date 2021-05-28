const recipeService = require('../services/recipeService');

const entriesMessage = { message: 'Invalid entries. Try again.' };
const errorMessage = { message: 'Erro interno' };
const notFound = { message: 'recipe not found' };

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user;
  const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, id);
  const { _id } = newRecipe; 

  if (!name || !ingredients || !preparation) {
    return res.status(400).json(entriesMessage);
  }

  res.status(201).json({
    recipe: { name, ingredients, preparation, _id },
  });
  
  next();
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipeId = await recipeService.getRecipeById(id);

  if (!recipeId) return res.status(404).json(notFound);
  res.status(200).json(recipeId);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
