const jwt = require('jsonwebtoken');
// const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const { code200, code201, code204 } = require('../utils/dictionary');

const addRecipe = async (request, response) => {
  const { authorization } = request.headers;
  const { name, ingredients, preparation } = request.body;

  const { _id: userId } = jwt.decode(authorization);

  const { insertedId } = await recipesModel.addRecipe(name, ingredients, preparation, userId);

  const addedRecipe = {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };

  return response.status(code201).send({ recipe: addedRecipe });
};

const getAll = async (request, response) => {
  const allRecipes = await recipesModel.getAll();

  return response.status(code200).json(allRecipes);
};

const getById = async (request, response) => {
  const { id } = request.params;

  const recipe = await recipesModel.getById(id);
  return response.status(code200).send(recipe);  
};

const updateById = async (request, response) => {
  const { authorization } = request.headers;
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const { _id: userId } = jwt.decode(authorization);

  await recipesModel.updateById(id, name, ingredients, preparation);
  
  const updatedRecipe = {
    id,
    name,
    ingredients,
    preparation,
    userId,
  };

  return response.status(code200).send(updatedRecipe);
};

const removeById = async (request, response) => {
  const { id } = request.params;

  await recipesModel.removeById(id);

  return response.status(code204).end();
};

module.exports = {
  addRecipe,
  getAll,
  getById,
  updateById,
  removeById,
};
