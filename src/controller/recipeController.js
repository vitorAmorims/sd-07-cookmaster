const { ApiStatusCode } = require('../enums');
const { recipeService } = require('../services');

const createRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const recipeRes = await recipeService.createRecipe(recipe);
    console.log(recipeRes);
    return res.status(ApiStatusCode.CREATED).json(recipeRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipeRes = await recipeService.getRecipes();
    return res.status(ApiStatusCode.SUCCESS).json(recipeRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeRes = await recipeService.getRecipeById(id);
    return res.status(ApiStatusCode.SUCCESS).json(recipeRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = req.body;
    const recipeRes = await recipeService.updateRecipe(id, recipe);
    return res.status(ApiStatusCode.SUCCESS).json(recipeRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeRes = await recipeService.deleteRecipe(id);
    return res.status(ApiStatusCode.DELETED).json(recipeRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const uploadPhoto = async (req, res) => {
  try {
   const { id } = req.params;
   const uploadRes = await recipeService.uploadPhoto(id);
   return res.status(ApiStatusCode.SUCCESS).json(uploadRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getPhoto = async (req, res) => {
  try {
   const { url } = req;
   return res.status(ApiStatusCode.SUCCESS).sendFile(url);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadPhoto,
  getPhoto,
};
