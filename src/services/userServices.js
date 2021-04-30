const jsonwebtoken = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const SECRET_JWT = 'nobailenosehmidia';

const validateUser = (user) => {
  const invalidEntries = 'Invalid entries. Try again.';
  if (!user.email || !regex.test(user.email)) throw new Error(invalidEntries);
  if (!user.password) throw new Error(invalidEntries);
  if (!user.name) throw new Error(invalidEntries);
};

const createUser = async (user) => {
  // console.log(user);
  const { email } = user;
  console.log({ email });
  validateUser(user);
  const search = await usersModel.searchByEmail(email);
  console.log({ search });
  if (search !== null) throw new Error('Email already registered');
  return usersModel.createUser(user);  
};

const loginHandler = async (user) => {
  const { email, password } = user;
  if (!email || !password) throw new Error('All fields must be filled');
  const userExists = await usersModel.searchByAccount(email, password);
  if (!userExists) throw new Error('Incorrect username or password');
  const token = jsonwebtoken.sign({ data: user }, SECRET_JWT, {
    expiresIn: 1000 * 60 * 5,
    algorithm: 'HS256',
  });
  return { token };
};

module.exports = {
  createUser,
  loginHandler,
};
