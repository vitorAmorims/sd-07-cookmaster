const joi = require('joi');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const usersModel = require('../users/usersModel');

const validateUserMiddleware = async (req, _res, next) => {
  const userData = req.body;
  const validate = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).validate(userData);
  try {
    if (validate.error) {
       return next(
        { status: StatusCodes.BAD_REQUEST, message: 'Invalid entries. Try again.' },
      ); 
    }
    next();
  } catch (error) {
    return null;
  }
};

const MESSAGE = {
  filled: 'All fields must be filled',
};
const validateLoginMiddleware = async (req, _res, next) => {
  const userData = req.body;
  const validate = joi.object({
    email: joi.string().email().required(),
    password: joi.required(),
  }).validate(userData);
  console.log('validate', validate);
  try {
    if (validate.error) {
      return next(
        { status: StatusCodes.UNAUTHORIZED, message: MESSAGE.filled },
      ); 
    }
    next();
  } catch (error) {
    return null;
  }
};

const validateTokenMiddleware = async (req, _res, next) => {
  const secret = 'cookmaster';
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: StatusCodes.UNAUTHORIZED, message: MESSAGE.filled }); 
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findEmailModel(decoded.data);
    if (!user) {
      return next({ status: StatusCodes.UNAUTHORIZED, message: MESSAGE.filled }); 
    }
    req.user = user;
    next();
  } catch (error) {
    return null;
  }
};

module.exports = {
  validateUserMiddleware,
  validateLoginMiddleware,
  validateTokenMiddleware,
};
