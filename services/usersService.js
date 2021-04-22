const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
const newUser = await usersModel.createUser(name, email, password);
  return newUser;
};

const createLogin = async (username) => {
const user = await usersModel.findUser(username);
  return user;
};

module.exports = {
  createUser,
  createLogin,
};
