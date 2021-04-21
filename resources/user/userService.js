const userModel = require('./userModel');
// const cryptography = require('../../helpers/cryptography');

const create = async (name, email, password) => {
  const existUser = await userModel.findByEmail(email);
  if (existUser) {
    throw new Error('Email already registered');
  } 

  // const encryptedPassord = cryptography.encryptText(password);

  const newUser = await userModel.create(name, email, password/* encryptedPassord */, 'user');
  delete newUser.password;
  return newUser;
};

const findByEmail = async (email) => {
  const foundUser = await userModel.findByEmail(email);
  if (!foundUser) {
    throw new Error('User not found');
  } 
  return foundUser;
};

module.exports = {
  create,
  findByEmail,
  /* findById,
  findAll,
  update,
  del, */
};