// incompatibilidade do bcrypt com o teste automatizado
// const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');

const SECONDS = 60;
const MULTIPLIER = 3000;
const secret = 'acertomiseravi';

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

const fieldsExistis = (email, password) => {
  if (email === ''
  || email === undefined
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

const emailCheck = async (email) => {
  const emailInvalid = !validateEmail(email);
  const user = await usersModel.findUser(email);
  if (email === '' || email === undefined || emailInvalid) {
    return true;
  }
  if (!user) {
    return true;
  }
  return false;
};

const passwordCheck = async (email, password) => {
  const user = await usersModel.findUser(email);
  // const passwordValidate = bcrypt.compareSync(password, user.password);
  const passwordValidate = password === user.password;
  if (!passwordValidate) {
    return true;
  }
  return false;
};

const registerUser = async (email, password) => {
  const jwtConfig = {
    expiresIn: SECONDS * MULTIPLIER,
    algorithm: 'HS256',
  };
  if (!fieldsExistis(email, password)) {
    return {
      fieldHalf: true, message: 'All fields must be filled',
    };
  }
  if (await emailCheck(email) || await passwordCheck(email, password)) {
    return {
      checkFail: true, message: 'Incorrect username or password',
    };
  }
  const user = await usersModel.findUser(email);
  const { _id, role } = user;
  const token = jwt.sign({ data: { _id, email: user.email, role } }, secret, jwtConfig);
  return token;
};

module.exports = {
  statusHttp,
  registerUser,
  secret,
};