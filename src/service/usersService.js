// incompatibilidade do bcrypt com o teste automatizado
// const bcrypt = require('bcrypt-nodejs');
const usersModel = require('../model/usersModel');

const statusHttp = {
  C_200: 200,
  C_201: 201,
  C_204: 204,
  C_400: 400,
  C_401: 401,
  C_403: 403,
  C_404: 404,
  C_409: 409,
  C_422: 422,
  C_500: 500,
};

const ZERO = 0;

const fieldsExistis = (name, password) => {
  if (name === ''
  || name === undefined
  || password === ''
  || password === undefined) {
    return false;
  }
  return true;
  };

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}
const emailCheck = (email) => {
  const emailInvalid = !validateEmail(email);
  if (email === '' || email === undefined || emailInvalid) {
    return true;
  }
  return false;
};

const verifyCountEmail = async (email) => {
  const countEmail = await usersModel.countByEmailDuplicate(email);
  if (countEmail > ZERO) { return true; }
  return false;
};

const create = async (name, email, password) => {
  let result = {};
  const key = password;
  // const salt = bcrypt.genSaltSync(5);
  // key = bcrypt.hashSync(key, salt);

  if (!fieldsExistis(name, password)
    || emailCheck(email)) {
    return {
      code400: true, message: 'Invalid entries. Try again.',
    };
  }
  if (await verifyCountEmail(email) === true) {
    return {
      code409: true, message: 'Email already registered',
    };
  }
  result = await usersModel.createUser(name, email, key);
  return result;
  };

module.exports = {
  statusHttp,
  create,
};