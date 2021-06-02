const modelUsers = require('../models/modelUsers');

const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const ALREADY_EXISTS_MESSAGE = 'Email already registered';

const nameVerification = (name) => {
  if (name === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

const emailVerification = (email, allUsers) => {
  const regexEmail = new RegExp('.+@[A-z]+[.]com');

  const userAlreadyExists = allUsers.some((element) => element.email === email);

  if (email === undefined || !regexEmail.test(email)) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  } else if (userAlreadyExists) {
    throw new Error(ALREADY_EXISTS_MESSAGE);
  }
};

const passwordVerification = (password) => {
  if (password === undefined) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

const createUser = async (name, email, password) => {
  const allUsers = await modelUsers.getAllUsers();

  try {
    nameVerification(name);
    emailVerification(email, allUsers);
    passwordVerification(password);

    const newUser = await modelUsers.createUser(name, email, password);
    return newUser;
  } catch (error) {
    return error.message;
  }
};

const createAdm = async (name, email, password, role) => {
  if (role !== 'admin') {
    return 'Only admins can register new admins';
  }
  const newAdmin = await modelUsers.createAdm(name, email, password);
  return newAdmin;
};

module.exports = { createUser, createAdm };
