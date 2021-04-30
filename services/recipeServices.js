const { ObjectId } = require('mongodb');

const recipeModels = require('../models/recipeModels');
const message = require('./messageService.json');

const Model = recipeModels;

const idValid = (id) => {
  if (!ObjectId.isValid(id)) return message.notFound;
  return true;
};

const validEntrie = (myValue) => {
  if (myValue === undefined || myValue === null) return message.invalid;
  if (typeof myValue !== 'string') return message.invalid;
  return true;
};

const validEmail = (myEmail) => {
  const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
  if (!emailvalidation.test(myEmail)) return message.invalid;
  return true;
};

const uniqueEmail = async (myEmail) => {
  const recipes = await Model.getAll();
  const exists = await recipes
    .find((recipe) => recipe.email === myEmail );
  if (exists) return message.already;
  return true;
};


const getById = (id) => {
  if (idValid(id) !== true) return idValid(id);
  return true;
};

const create = ({ name, ingredients, preparation }) => { 
  const validateN = validEntrie(name);
  if (validateN !== true) return validateN;
  const validateI = validEntrie(ingredients);
  if (validateI !== true) return validateI;
  const validateP = validEntrie(preparation);
  if (validateP !== true) return validateP;
  return true;
};

const update = async ({ id, name, ingredients, preparation }) => {
  if (idValid(id) !== false) return idValid(id);
  if (validEntrie(name) !== true) return validEntrie(name);
  if (validEntrie(ingredients) !== true) return validEntrie(ingredients);
  if (validEntrie(preparation) !== true) return validEntrie(preparation);
  return true;
};

const exclude = async (id) => {
  if (idValid(id) !== true) return idValid(id);
  const product = await Model.getById(id);
  if (product === null) return validateId;
  return true;
};

const getAll = async () => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};