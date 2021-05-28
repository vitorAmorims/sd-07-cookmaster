const jwt = require('jsonwebtoken');
const modelUser = require('../models/userModel');
const recipesModel = require('../models/recipesModel');

const ERR_MESSAGE = 'Invalid entries. Try again.';

const validateName = (name) => {
  if (!name) {
    throw new Error(ERR_MESSAGE);
  }
  return name;
};

const validateIngredients = (ingredients) => {
  if (!ingredients) {
    throw new Error(ERR_MESSAGE);
  }
  return ingredients;
};

const validatePreparation = (preparation) => {
  if (!preparation) {
    throw new Error(ERR_MESSAGE);
  }
};

const getUserIdByToken = async (token) => {
  const newSecret = 'secret123';
  const decoded = jwt.verify(token, newSecret);
  const { _id: id } = await modelUser.getByEmail(decoded.email);
  const userId = id;
  return userId;
};

const createRecipes = async (name, ingredients, preparation, token) => {
  validateName(name);
  validateIngredients(ingredients);
  validatePreparation(preparation);
  const userId = await getUserIdByToken(token);
  const user = await recipesModel.create(name, ingredients, preparation, userId);
  return user;
};

module.exports = {
  createRecipes,
};