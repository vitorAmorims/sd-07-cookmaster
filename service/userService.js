const userModel = require('../model/userModel');

const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const insertNewUser = async (user) => {
  const objectUser = user;
  const isValidUser = Object.keys(objectUser).includes('name', 'password', 'email');
  objectUser.role = 'user';
  if (!objectUser.email 
    || !regex.test(objectUser.email)) throw new Error('Invalid entries. Try again.');
  if (!isValidUser) throw new Error('Invalid entries. Try again.');
  const isUnicEmail = await userModel.findByEmail(objectUser);
  console.log(isUnicEmail);
  if (isUnicEmail !== null) throw new Error('Email already registered');

  return userModel.insertNewUser(objectUser);
};

module.exports = {
  insertNewUser,
};