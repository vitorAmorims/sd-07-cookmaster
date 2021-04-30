const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const userModels = require('../models/userModels');
const message = require('./messageService.json');

const Model = userModels;

const SECRET = 'MASTERSKYWALKERISJEDI';

const idValid = (id) => {
  if (!ObjectId.isValid(id)) return message.idValid;
  return true;
};

const validEntrie = (myValue) => {
  if (myValue === undefined || myValue === null) return message.filled;
  if (typeof myValue !== 'string') return message.filled;
  return true;
};

const validEmail = (myEmail) => {
  const emailvalidation = /[\w\d]+@+[\w\d]+.com/;
  if (!emailvalidation.test(myEmail)) return message.invalidLogin;
  return true;
};

const existsUser = async (myEmail, myPassword) => {
  const users = await Model.getAll();
  const exists = await users
    .find((user) => user.email === myEmail && user.password === myPassword);
  if (!exists) return message.incorrect;
  return true;
};

const tokenCreate = async (myEmail, myPassword) => {
  const users = await Model.getAll();
  const { _id, email, role } = await users
    .find((user) => user.email === myEmail && user.password === myPassword);
  
  const token = jwt.sign({ _id, email, role }, SECRET);
  return ({ token });
};

const getById = (id) => {
  if (idValid(id) !== true) return idValid(id);
  return true;
};

const create = async ({ email, password }) => { 
  if (validEntrie(email) !== true) return validEntrie(email);
  if (validEmail(email) !== true) return validEmail(email);
  if (validEntrie(password) !== true) return validEntrie(password);
  if (await existsUser(email, password) !== true) return existsUser(email, password);
  const token = await tokenCreate(email, password);
  return token;
};

const update = async ({ id, name, email, password }) => {
  if (create({ name, email, password }) !== true) return create({ name, email, password });
  if (idValid(id) !== false) return idValid(id);
  return true;
};

const exclude = async (id) => {
  if (idValid(id) !== true) return idValid(id);
  const product = await Model.getById(id);
  if (product === null) return message.idValid;
  return true;
};

const getAll = async () => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};