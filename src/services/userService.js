const { userModel } = require('../models');

const createUser = async (username, email, password) => {
  const userRes = userModel.createUser(username, email, password);
  return userRes;
};

const createAdmin = async (admin) => {
  const { name, email, password } = admin;
  const adminRes = await userModel.createUser(name, email, password, 'admin');
  return adminRes;
};

module.exports = {
  createUser,
  createAdmin,
};