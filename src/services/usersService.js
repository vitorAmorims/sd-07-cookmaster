const usersModel = require('../models/usersModel');

// ----------------------------------------- Funções de verificação

const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const ALREADY_EXISTS_MESSAGE = 'Email already registered';

const verifyName = (name) => {
  if (name === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

const verifyEmail = (email, allUsers) => {
  const regexEmail = new RegExp('.+@[A-z]+[.]com');

  const userAlreadyExists = allUsers.some((element) => element.email === email);

  if (email === undefined || !regexEmail.test(email)) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  } else if (userAlreadyExists) {
    throw new Error(ALREADY_EXISTS_MESSAGE);
  }
};

const verifyPassword = (password) => {
  if (password === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ------------------------------------------- Funções que chamam o model

const createUser = async (name, email, password) => {
  const allUsers = await usersModel.getAllUsers();

  try {
    verifyName(name);
    verifyEmail(email, allUsers);
    verifyPassword(password);

    const newUser = await usersModel.createUser(name, email, password);
    return newUser;
  } catch (error) {
    return error.message;
  }
};

const createAdmin = async (name, email, password, role) => {
  if (role !== 'admin') {
    return 'Only admins can register new admins';
  }
  const newAdmin = await usersModel.createAdmin(name, email, password);
  return newAdmin;
};

module.exports = { createUser, createAdmin };
