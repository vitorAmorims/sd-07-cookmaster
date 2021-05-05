const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;

    const recipes = await recipesService.createRecipes(name, ingredients, preparation);

    if (recipes.erro) {
      return res.status(recipes.erro.status).json({ message: recipes.erro.message });
    }
    return res.status(201)
      .json({ recipe: { name, ingredients, preparation, _id: recipes.insertedId } });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    // console.log('recipes no control', recipes);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeId = await recipesService.getById(id);
    if (recipeId.msg) {
      return res.status(recipeId.status).json(recipeId.msg);
    }
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getById,
};
