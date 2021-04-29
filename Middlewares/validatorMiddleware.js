/** @format */

const { validationResult } = require('express-validator');
const { BAD_REQ, CONFLIT, UNAUTHORIZED } = require('../CODE_ERROR');
const { getEmailUser } = require('../services');

const E1 = {
  status: BAD_REQ,
  err: 'Invalid entries. Try again.',
};

const E2 = {
  status: CONFLIT,
  err: 'Email already registered',
};

const E3 = {
  status: UNAUTHORIZED,
  err: 'All fields must be filled',
};

const validatorMiddleware = async (req, _res, next) => {
  const { email } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) return next(E1);
  const emailUser = await getEmailUser(email);
  if (emailUser) return next(E2);
  next();
};

const validLoginMiddleware = async (req, _res, next) => {
  const errorLogin = validationResult(req);
  if (!errorLogin.isEmpty()) return next(E3);
  next();
};

module.exports = { validatorMiddleware, validLoginMiddleware };
