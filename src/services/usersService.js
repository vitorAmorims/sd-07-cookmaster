const joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const InvalidEntries = require('../customErrors/invalidEntries');

const { secret } = require('../auth/secret.json');

const validateUserInput = (name, email, password) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
      .required(),
    password: joi.string().required(),
  });
  const { error } = schema.validate({ name, email, password });
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

const login = async (emailInput, passwordInput) => {
  if (!emailInput || !passwordInput) {
    throw new InvalidEntries('All fields must be filled', 401);
  }

  const user = await usersModel.getByEmail(emailInput);
  if (!user || user.password !== passwordInput) {
    throw new InvalidEntries('Incorrect username or password', 401);
  } 

  const { _id, email, role } = user;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);

  return token;
};

module.exports = {
  createUser,
  login,
};