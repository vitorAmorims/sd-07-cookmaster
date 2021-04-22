const recipesService = require('../services/recipesService');

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
    res.status(http).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno', err: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipesService.getAllRecipes();
    const { http, message } = allRecipes;
    res.status(http).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno', err: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
