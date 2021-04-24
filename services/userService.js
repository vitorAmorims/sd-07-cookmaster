const user = require('../models/userModel');

const createUser = async (name, email, password) => {
  const role = 'user';
  const newUser = await user.create(name, email, password, role);

  return newUser;
};

module.exports = {
  createUser,
};