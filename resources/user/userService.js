const userModel = require('./userModel');

const create = async (name, email, password) => {
  const existUser = await userModel.findByEmail(email);
  if (existUser) {
    throw new Error('Email already registered');
  } 
  const newUser = await userModel.create(name, email, password, 'user');
  return newUser;
};

module.exports = {
  create,
  /* findById,
  findAll,
  update,
  del, */
};