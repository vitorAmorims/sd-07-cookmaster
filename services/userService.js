const UsersModel = require('../models/usersModel');
const error = require('../errors');

const validateName = async (name) => {
  if (typeof name !== 'string') throw error.invalidEntries;
};

const validatePassword = async (password) => {
  if (typeof password !== 'string') throw error.invalidEntries;
};

const validadeEmail = async (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!regex.test(email)) throw error.invalidEntries;
  if (await UsersModel.findUserByEmail(email)) throw error.email;
};

const registerUser = async (name, email, password) => {
  await validateName(name);
  await validatePassword(password);
  await validadeEmail(email);
  const registeredUser = await UsersModel.addNewUser(name, email, password);
  return registeredUser;
};

module.exports = {
  registerUser,
};
