const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  const response = await userModel.createUser(name, email, password);
  return response;
};

const findByEmail = async (email) => {
  const response = await userModel.findByEmail(email);
  return response;
};

module.exports = { createUser, findByEmail };
