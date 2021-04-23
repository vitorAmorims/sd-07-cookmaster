const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
const newUser = await usersModel.createUser(name, email, password);
  return newUser;
};

const createLogin = async (email) => {
const login = await usersModel.findEmail(email);
  return login;
};

module.exports = {
  createUser,
  createLogin,
};
