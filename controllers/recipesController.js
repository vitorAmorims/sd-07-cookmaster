const recipesService = require('../services/recipesService');

const internalError = 'Erro interno';
const Hash = 'YHgWQGD8ZeExU9Lez_IIekqBfXcquHAgG0rj9v0mXf0';

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
    console.log('nonato');
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const getRecipe = await recipesService.getRecipeById(id);
    const { http, message } = getRecipe;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const updatedRecipe = await recipesService.updateRecipe(req.body, user, id);
    const { http, message } = updatedRecipe;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await recipesService.deleteRecipe(id);
    const { http, message } = results;

    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDest = `localhost:3000/${req.file.path}`;
    const recipeWithImage = await recipesService.uploadImage(imageDest, id);
    const { http, message } = recipeWithImage;
    return res.status(http).json(message);
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

const getImageRecipe = async (req, res) => {
  try {
    const getRecipe = await recipesService.getImageRecipe(req.path);
    const { http, message } = getRecipe;
    return res.status(http).sendFile(message, { root: process.cwd() });
  } catch (error) {
    return res.status(500).json({ message: internalError, err: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  getImageRecipe,
  Hash,
};
