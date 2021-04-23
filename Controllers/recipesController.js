const recipesService = require('../Services/recipesService');

const addStatus = 201;
const statusOk = 200;
const deleteOk = 204;
const notFound = 404;
const updateError = 401;
const internalError = 500;

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
    res.status(statusOk).json(result);
  } catch (error) {
    console.error({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesService.getRecipeById(id);
    res.status(statusOk).json(result);
  } catch (error) {
    console.error({ message: error.message });
    res.status(notFound).json(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await recipesService.updateRecipe(id, name, ingredients, preparation);
    res.status(statusOk).json(result);
  } catch (error) {
    console.error({ message: error.message });
    res.status(updateError).json(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesService.deleteRecipe(id);
    res.status(deleteOk).json(result);
  } catch (error) {
    console.error({ message: error.message });
    res.status(notFound).json(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const result = await recipesService.uploadImage(id, `localhost:3000/${path}`);
    res.status(statusOk).json(result);
  } catch (error) {
    console.error({ message: error.message });
    res.status(internalError).json(error);
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
