const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  const response = await userModel.createUser(name, email, password);
  return response;
};

module.exports = { createUser };
