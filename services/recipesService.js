const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const { code200, code201, code404, message } = require('../utils/dictionary');

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

  if (!ObjectId.isValid(id)) {
    return response.status(code404).send({ message: message.noRecipe });
  }

  const recipe = await recipesModel.getById(id);
  return response.status(code200).send(recipe);  
};

module.exports = {
  addRecipe,
  getAll,
  getById,
};
