const jwt = require('jsonwebtoken');
const model = require('../models/recipeModel');

const secret = 'SDkjasK2343Ad34';
const missError = 'missing auth token';

const newError = (message) => { throw new Error(message); };

const getAll = () => model.getAll();

const getById = async (id) => {
  const recipe = await model.getById(id);
  if (!recipe) newError('recipe not found');

  return recipe;
};

const newRecipe = async (objct, token) => {
  if (!objct.name || !objct.ingredients || !objct.preparation) {
    newError('Invalid entries. Try again.');
  }
  if (!token) newError('jwt malformed');

  const { _id: userId } = jwt.verify(token, secret);
  const addedRecipe = await model.newRecipe({ ...objct, userId });

  return addedRecipe;
};

const editRecipe = async (objct, token) => {
  if (!token) newError(missError);
  jwt.verify(token, secret);

  const recipe = await model.editRecipe(objct);
  return recipe;
};

const deleteRecipe = async (id, token) => {
  if (!token) newError(missError);
  jwt.verify(token, secret);

  const recipe = await model.deleteRecipe(id);
  if (!recipe) newError('recipe not found');
  
  return recipe;
};

const addImage = async (id, token) => {
  if (!token) newError(missError);
  jwt.verify(token, secret);

  const recipe = await model.addImage(id);

  return recipe;
};

module.exports = {
  newRecipe,
  getAll,
  getById,
  editRecipe,
  deleteRecipe,
  addImage,
};
