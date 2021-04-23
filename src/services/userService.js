const { findUserByEmail } = require('../models/userModel');

const regexEmail = /\S+@\S+\.\S+/;

const validateNullCamps = (name, email, password) => {
  if (
    name === undefined 
    || email === undefined 
    || password === undefined 
    || !regexEmail.test(email)
  ) {
    return {
      message: 'Invalid entries. Try again.',
      status: 400,
    };
  }
  return {};
};

const createUserValidation = async (name, email, password) => {
  let validationObject = {};
  validationObject = validateNullCamps(name, email, password);
  if (validationObject.message) {
    return validationObject;
  }
  const userByEmail = await findUserByEmail(email);
  if (userByEmail !== null && userByEmail.email === email) {
    validationObject = {
      message: 'Email already registered',
      status: 409,
    };
  }
  return validationObject;
};

const validateLoginCamps = (email, password) => {
  if (email === undefined || password === undefined) {
    return {
      message: 'All fields must be filled',
      status: 401,
    };
  }
  return {};
};

const validateEmailAndPasswordLogin = async (email, password) => {
  const user = await findUserByEmail(email);
  if (user === null) {
      return {
        message: 'Incorrect username or password',
        status: 401,
      };
  }
  if (
    user.email !== email 
    || user.password !== password 
    || !regexEmail.test(email)
  ) {
    return {
      message: 'Incorrect username or password',
      status: 401,
    };
  }
  return {};
};

const loginUserValidation = async (email, password) => {
  let validationObject = {};
  validationObject = validateLoginCamps(email, password);
  if (validationObject.message) {
    return validationObject;
  }
  validationObject = await validateEmailAndPasswordLogin(email, password);
  return validationObject;
};

module.exports = {
  createUserValidation,
  loginUserValidation,
};
