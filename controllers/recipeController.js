const RecipeModel = require('../models/recipeModels');
const { idToken } = require('../services/authService');

const addRecipe = async (req, resp) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const id = idToken(authorization);
    const newRecipe = await RecipeModel.addRecipe(name, ingredients, preparation, id);
    resp.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.error(error.message);
    resp.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, _resp) => {
  console.log('hola');
};

module.exports = {
  addRecipe,
  getAll,
};