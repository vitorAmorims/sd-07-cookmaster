const jwt = require('jsonwebtoken');
const recipeService = require('../services/recipiesService');
const userModel = require('../models/usersModels');

const addrecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { code, recipe, message } = await recipeService.add(name, ingredients, preparation);
  
  if (!recipe) return res.status(code).json({ message });

  const token = req.headers.authorization;
  const secret = 'senha';
  const decoded = jwt.verify(token, secret);
  const user = await userModel.getUserByEmail(decoded.data.email);

  res.status(code).json({ 
    recipe: {
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      userId: user.id,
      _id: recipe.id,
  } });
};

const getAllRecipes = async (_req, res) => {
  const { code, recipes } = await recipeService.getAll();
  
  return res.status(code).json( recipes );
};

module.exports = {
  addrecipe,
  getAllRecipes,
};