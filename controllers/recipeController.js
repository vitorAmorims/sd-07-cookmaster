const RecipeModel = require('../models/recipeModels');
const UserModel = require('../models/userModel');
const { idToken, emailToken } = require('../services/authService');

const addRecipe = async (req, resp) => {
  try {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
    const id = idToken(authorization);
    const newRecipe = await RecipeModel.addRecipe(name, ingredients, preparation, id);
    return resp.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

const getAllRecipe = async (_req, resp) => {
  const recipes = await RecipeModel.getAllRecipe();
  resp.status(200).json(recipes);
};

const getByIdRecipe = async (req, resp) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeModel.getByIdRecipe(id);
    if (!recipe) {
      return resp.status(404).json({ message: 'recipe not found' });
    }
    resp.status(200).json(recipe);
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, resp) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { name, preparation, ingredients } = req.body;
    const email = emailToken(authorization);
    const { role, _id } = await UserModel.replyEmail(email);
    const { userId } = await RecipeModel.getByIdRecipe(id);
    const newRecipe = { id, name, ingredients, preparation, userId };
    if (role === 'admin' || userId.match(_id)) {
      const response = await RecipeModel.updateRecipe(newRecipe);
      return resp.status(200).json(response);
    }
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, resp) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    
    const email = emailToken(authorization);
    const { role, _id } = await UserModel.replyEmail(email);
    const { userId } = await RecipeModel.getByIdRecipe(id);
    
    if (role === 'admin' || userId.match(_id)) {
      const response = await RecipeModel.deleteRecipe(id);
      return resp.status(204).json(response);
    }
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRecipe,
  getAllRecipe,
  getByIdRecipe,
  updateRecipe,
  deleteRecipe,
};