const { ObjectId } = require('mongodb');

const userModels = require('../models/userModels');
const message = require('./messageService.json');

const Model = userModels;

const idValid = (id) => {
  if (!ObjectId.isValid(id)) return message.idValid;
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
  const users = await Model.getAll();
  const exists = await users
    .find((user) => user.email === myEmail );
  if (exists) return message.already;
  return true;
};


const getById = (id) => {
  if (idValid(id) !== false) return idValid(id);
  return true;
};

const create = ({ name, email, password }) => { 
  if (validEntrie(name) !== true) return validEntrie(name);
  if (validEntrie(email) !== true) return validEntrie(email);
  if (validEntrie(password) !== true) return validEntrie(password);
  if (validEmail(email) !== true) return validEmail(email);
  if (uniqueEmail(email) !== true) return uniqueEmail(email);
  return true;
};

const update = async ({ id, name, email, password }) => {
  if (create({name, email, password}) !== true) return create({name, email, password});
  if (idValid(id) !== false) return idValid(id);
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