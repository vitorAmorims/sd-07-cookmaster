const recipesService = require('../services/recipesService');

const internalError = 'Erro interno';
const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, user } = req.body;
    const createdRecipe = await recipesService.createRecipes(
      name,
      ingredients,
      preparation,
      user,
    );
    const { http, message } = createdRecipe;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipesService.getAllRecipes();
    const { http, message } = allRecipes;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const getRecipe = await recipesService.getRecipeById(id);
    console.log(getRecipe);
    const { http, message } = getRecipe;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
