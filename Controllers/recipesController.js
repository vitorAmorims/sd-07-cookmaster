const recipesService = require('../Services/recipesService');

const addStatus = 201;
const getStatus = 200;
const notFound = 404;

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await recipesService.createRecipes(name, ingredients, preparation, userId);
    res.status(addStatus).json({ recipe: newRecipe });
  } catch (error) {
    console.error({ message: error.message });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const result = await recipesService.getAllRecipes();
    res.status(getStatus).json(result);
  } catch (error) {
    console.error({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesService.getRecipeById(id);
    res.status(getStatus).json(result);
  } catch (error) {
    console.error({ message: error.message });
    res.status(notFound).json(error);
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};
