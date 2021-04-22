const joi = require('joi');
const usersModel = require('../models/usersModel');
const InvalidEntries = require('../customErrors/invalidEntries');

const validateUserInput = (name, email, password) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
      .required(),
    password: joi.string().required(),
  });
  const { error } = schema.validate({ name, email, password });
  console.log(error);
  if (error) {
    throw new InvalidEntries('Invalid entries. Try again.', 400);
  }
};

const isEmailExist = async (email) => {
  const emailResult = await usersModel.getByEmail(email);
  if (emailResult) {
    throw new InvalidEntries('Email already registered', 409);
  }
};

const createUser = async (name, email, password) => {
  validateUserInput(name, email, password);
  await isEmailExist(email);
  const newUser = await usersModel.createUser(name, email, password);
  return ({ user: { ...newUser } });
};

module.exports = {
  createUser,
};