const userModel = require('./userModel');

const createUser = async (name, email, password) => {
  const exists = await userModel.getByEmail(email);
  if (exists) throw new Error('Email already registered');
  const createdUser = await userModel.createUser(name, email, password);
  return createdUser;
};

module.exports = {
  createUser,
};
