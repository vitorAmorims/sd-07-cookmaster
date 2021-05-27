const recipeService = require('../services/recipeService');

const entriesMessage = { message: 'Invalid entries. Try again.' };
const errorMessage = { message: 'Erro interno' };
const notFound = { message: 'recipe not found' };

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  await recipeService.createRecipe(name, ingredients, preparation);

  if (!name || !ingredients || !preparation) {
    return res.status(400).json(entriesMessage);
  }

  res.status(201).json({
    recipe: {
      name,
      ingredients,
      preparation,
    },
  });
  
  next();
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const getRecipeById = async (req, res) => {
  const recipeId = await recipeService.getRecipeById(req.params.id);

  if (!recipeId) return res.status(404).json(notFound);
  res.status(200).json(recipeId);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
