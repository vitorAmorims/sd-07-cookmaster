const usersModel = require('../models/usersModel');

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const validateUser = (user) => {
  const invalidEntries = 'Invalid entries. Try again.';
  if (!user.email || !regex.test(user.email)) throw new Error(invalidEntries);
  if (!user.password) throw new Error(invalidEntries);
  if (!user.name) throw new Error(invalidEntries);
};

const createUser = async (user) => {
  // console.log(user);
  validateUser(user);
  const search = usersModel.searchByEmail(user.email);
  if (search) throw new Error('Email already registered');
  return usersModel.createUser(user);  
};

module.exports = {
  createUser,
};
