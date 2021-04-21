const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const { ObjectId } = require('mongodb');
const modelsUsers = require('../models/modelsUsers');

const createLogin = async (email, password) => {

  if (!email || !password) {
    throw {
      code: 'invalid_user',
      message: 'All fields must be filled',
    };
  }
  const validatedLogin = await modelsUsers.getByEmail(email);
  if (!validatedLogin || validatedLogin.password !== password) {
    throw {
      code: 'unauthorized',
      message: 'Incorrect username or password',
    };
  }
  return validatedLogin;
};

module.exports = {
  // createLogin,
};
