const { usersModel } = require('../models');

const validEntries = async (name, email, password) => {
  const regex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!name || !email || !password || !regex.test(email)) {
    const error = new Error('Invalid entries. Try again.');
    error.statusCode = 'bad_request';
    throw error;
  }
};

const registeredEmail = async (email) => {
  const emailVerify = await usersModel.findByEmail(email);
  if (emailVerify) {
    const error = new Error('Email already registered');
    error.statusCode = 'conflict';
    throw error;
  }
};

const isEmailPassword = (email, password) => {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.statusCode = 'unauthorized';
    throw error;
  }
};

const validLogin = async (email, password) => {
  const emailVerify = await usersModel.findByEmail(email);
  if (!emailVerify || emailVerify.password !== password) {
    const error = new Error('Incorrect username or password');
    error.statusCode = 'unauthorized';
    throw error;
  }
  return emailVerify;
};

module.exports = {
  validEntries,
  registeredEmail,
  isEmailPassword,
  validLogin,
};