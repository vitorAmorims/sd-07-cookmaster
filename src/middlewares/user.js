const { StatusCodes: { BAD_REQUEST, CONFLICT, UNAUTHORIZED } } = require('http-status-codes');
const userService = require('../service/users');

const valid = /\S+@\S+\.\S+/;

const userInfoTest = (req, res, next) => {
  const { name, email, password } = req.body;
  const tested = !valid.test(email);
  if (name === undefined
    || email === undefined
    || password === undefined 
    || tested) {
    return res.status(BAD_REQUEST).send({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const userEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const exists = await userService.findByEmail(email);
  console.log('existe', exists);
  if (typeof exists !== 'undefined') {
    return res.status(CONFLICT).send({
      message: 'Email already registered',
    });
  }
  next();
};

const loginInfoTest = (req, res, next) => {
  const { email, password } = req.body;
  const tested = !valid.test(email);
  if (email === undefined
    || password === undefined 
    || tested) {
      console.log('teste', valid.test(email));
    return res.status(UNAUTHORIZED).send({
      message: 'All fields must be filled',
    });
  }
  next();
};

module.exports = {
  userInfoTest,
  userEmailExists,
  loginInfoTest,
};