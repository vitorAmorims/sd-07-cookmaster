const path = require('path');
const recipeService = require('../services/recipeService');

const entriesMessage = { message: 'Invalid entries. Try again.' };
const errorMessage = { message: 'Erro interno' };
const notFound = { message: 'recipe not found' };

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, id);
    const { _id } = newRecipe; 
  
    if (!name || !ingredients || !preparation) {
      return res.status(400).json(entriesMessage);
    }
  
    res.status(201).json({
      recipe: { name, ingredients, preparation, _id },
    });
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  } 
  next();
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(errorMessage);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeId = await recipeService.getRecipeById(id);
  
    if (!recipeId) return res.status(404).json(notFound);
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const reqBody = req.body;
    const { id } = req.params;
    const modifyRecipe = await recipeService.updateRecipe({ id, reqBody });
    res.status(200).json(modifyRecipe);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }  
};

const deleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await recipeService.deleteRecipe(id);
    if (!id) {
      return res.status(500).json(errorMessage);
    }
    res.status(204).json(deleted);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const addImageRecipe = async (req, res) => {
    try {
      const { id } = req.params;
      const image = `${req.hostname}:3000/images/${id}.jpeg`;
      const recipeWithImage = await recipeService.addImageRecipe(id, image);
      
        res.status(200).json(recipeWithImage);
    } catch (error) {
      res.status(404).json(error);
    }
};

const getImageId = (req, res) => {
  try {
    const { id } = req.params;
    const imagesPath = path.join(__dirname, `../uploads/${id}`);
  
    res.status(200).sendFile(imagesPath);
  } catch (error) {
    res.status(404).json(error);
  }  
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleRecipe,
  addImageRecipe,
  getImageId,
};
