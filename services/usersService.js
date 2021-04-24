const { CustomError, STATUS_CODE } = require('../helpers');
const { usersModel } = require('../models');
const { generateToken } = require('../auth');

const checkIfNameEmailAndPasswordExist = (name, email, password) => {
  if (!name || !email || !password) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
};

const checkIfEmailIsValid = (email) => {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!regex) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
};

const checksIfEmailIsUnique = async (email) => {
  const result = await usersModel.findEmail(email);
  if (result) {
    throw new CustomError({
      status: STATUS_CODE.CONFLICT,
      message: 'Email already registered',
    });
  }
};

const userRegistration = async (name, email, password) => {
  const role = 'user';
  checkIfNameEmailAndPasswordExist(name, email, password);
  checkIfEmailIsValid(email);
  await checksIfEmailIsUnique(email);

  const result = await usersModel.userRegistration(name, email, password, role);
  return result;
};

const checkIfEmailAndPasswordExist = (email, password) => {
  if (!email || !password) {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
      message: 'All fields must be filled',
    });
  }
};

const checkIfEmailAndPasswordIsValid = async (email, password) => {
  const result = await usersModel.findEmail(email);
  if (!result || result.password !== password) {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
      message: 'Incorrect username or password',
    });
  }
};

const userLogin = async (email, password) => {
  checkIfEmailAndPasswordExist(email, password);
  await checkIfEmailAndPasswordIsValid(email, password);
  const token = await generateToken.create(email);
  return token;
};

module.exports = {
  userRegistration,
  userLogin,
};