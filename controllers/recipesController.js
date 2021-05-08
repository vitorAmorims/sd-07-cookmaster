const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  // console.log(req.user);

  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipes = await recipesService.createRecipes(name, ingredients, preparation, _id);

    if (recipes.erro) {
      return res.status(recipes.erro.status).json({ message: recipes.erro.message });
    }
    return res.status(201)
      .json({ recipe: recipes });
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

const updateRecipes = async (req, res) => {
  const { id } = req.params;
  // const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  try {
    const recipes = await recipesService.updateRecipes(id, name, ingredients, preparation);
    // console.log('update controller', recipes);
    if (!recipes) return res.status(401).json({ message: 'missing auth token' });
    return res.status(200).json({ _id: id, name, ingredients, preparation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await recipesService.deleteRecipe(id);

    return res.status(204).json();
    // res.status(204).json(recipe);
  } catch (error) {
    // console.error({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getById,
  updateRecipes,
  deleteRecipe,
};
