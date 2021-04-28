const usersModel = require('../models/usersModel');

const createUser = async (name, email, password) => {
  const user = await usersModel.findUser(email);
  const emailRegex = /\S+@\S+\.\S+/;
  if (!name || !password || !emailRegex.test(email)) {
    return { message: 'Invalid entries. Try again.', code: 400 };
  }
  if (user !== null) {
    return { message: 'Email already registered', code: 409 };
  }
  return usersModel.create(name, email, password);
};

const login = async (email, password) => {
  const user = await usersModel.findUser(email);
  if (!email || !password) {
    return { message: 'All fields must be filled', code: 401 };
  }
  if (user === null) {
    return { message: 'Incorrect username or password', code: 401 };
  }
  return user;
};

module.exports = {
  createUser,
  login,
};