const jwt = require('jsonwebtoken');
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

module.exports = {
  addRecipe,
  getAll,
};
