const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  const newUser = await userModel.createUser(name, email, password);
  return newUser;
};

const createLogin = async (email) => {
  const login = await userModel.findEmail(email);
  return login;
};

module.exports = {
  createUser,
  createLogin,
};
