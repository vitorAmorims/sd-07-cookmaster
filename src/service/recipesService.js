const jwt = require('jsonwebtoken');
const recipesModel = require('../model/recipesModel');
const usersModel = require('../model/usersModel');
const loginService = require('./loginService');

const { secret } = loginService;

const statusHttp = {
  C_200: 200,
  C_201: 201,
  C_204: 204,
  C_400: 400,
  C_401: 401,
  C_403: 403,
  C_404: 404,
  C_409: 409,
  C_422: 422,
  C_500: 500,
};

const nameExistis = (name) => {
  if (name === ''
  || name === undefined) {
    return false;
  }
  return true;
};

const ingredientsExistis = (ingredients) => {
  if (ingredients === ''
  || ingredients === undefined) {
    return false;
  }
  return true;
};

const preparationExistis = (preparation) => {
  if (preparation === ''
  || preparation === undefined) {
    return false;
  }
  return true;
};

const fieldsExistis = (name, ingredients, preparation) => {
  if (!nameExistis(name)
  || !ingredientsExistis(ingredients)
  || !preparationExistis(preparation)) {
    return false;
  }
  return true;
  };

const create = async (req) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const { _id } = await usersModel.findUser(decoded.data.email);
  const userId = _id;
  let result = {};

  if (!fieldsExistis(name, ingredients, preparation)) {
    return {
      code400: true, message: 'Invalid entries. Try again.',
    };
  }
  result = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return result;
};

module.exports = {
  statusHttp,
  create,
};