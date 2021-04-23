const fs = require('fs');
const path = require('path');
const recipesServices = require('../services/recipesServices');
const status = require('../config/statusTable');

const addRecipe = async (req, res) => {
  try {
    const { id } = req.data;
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await recipesServices.newRecipeValidation(id, name, ingredients, preparation);
    if (newRecipe.message) {
      return res.status(newRecipe.code).json({ message: newRecipe.message });
    }
    res.status(status.created).json({ recipe: newRecipe });
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await recipesServices.getRecipesValidation();
    res.status(status.ok).json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.recipeByIdValidation(id);
    if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
    res.status(status.ok).json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const userId = req.data.id;
    const { role } = req.data;
    const { id } = req.params;
    const newData = req.body;
    const updatedRecipe = await recipesServices.updateByIdValidation(id, newData, userId, role);
    if (updatedRecipe.message) {
      return res.status(updatedRecipe.code).json({ message: updatedRecipe.message });
    }
    res.status(status.ok).json(updatedRecipe);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const excludeRecipeById = async (req, res) => {
  try {
    const userId = req.data.id;
    const { role } = req.data;
    const { id } = req.params;
    const exclude = await recipesServices.excludeRecipeValidation(id, userId, role);
    if (exclude.message) {
      return res.status(exclude.code).json({ message: exclude.message });
    }
    res.status(status.noContent).end();
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const uploadRecipeImage = async (req, res) => {
  try {
    const userId = req.data.id;
    const { role } = req.data;
    const { id } = req.params;
    const { fileName } = req;
    const recipe = await recipesServices.uploadImageValidation(id, userId, role, fileName);
    if (recipe.message) {
      return res.status(recipe.code).json({ message: recipe.message });
    }
    res.status(status.ok).json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

const getImage = async (req, res) => {
  try {
    const imageName = req.params.id;
    const image = fs.createReadStream(path.join(__dirname, `../uploads/${imageName}`));
    res.status(status.ok).sendFile(image.path); 
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipeById,
  excludeRecipeById,
  uploadRecipeImage,
  getImage,
};