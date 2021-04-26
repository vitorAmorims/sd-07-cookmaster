const path = require('path');
const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const newRecipe = await recipesService.createRecipe(name, ingredients, preparation, user);
    res.status(201).json(newRecipe);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipesService.getAllRecipes();
    res.status(200).json(allRecipes);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);
    res.status(200).json(recipe);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = req.body;
    const { user } = req; 
    const recipeUpdated = await recipesService.updateRecipe(recipe, id, user);
    res.status(200).json(recipeUpdated);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req; 
    const recipeUpdated = await recipesService.deleteRecipe(id, user);
    res.status(204).json(recipeUpdated);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const updateRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { pathImage } = req; 
    const recipeImageUpdated = await recipesService.updateRecipeImage(
      id,
      pathImage,
    );
    res.status(200).json(recipeImageUpdated);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const sendRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(path.join(`${__dirname}/../../uploads/${id}`));
    res.status(200).sendFile(path.join(`${__dirname}/../../uploads/${id}`));
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
  sendRecipeImage,
};