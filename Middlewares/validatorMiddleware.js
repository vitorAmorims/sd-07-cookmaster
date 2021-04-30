/** @format */
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { BAD_REQ, CONFLIT, FORBIDDEN, UNAUTHORIZED } = require('../CODE_ERROR');
const { getEmailUser } = require('../services');
const { getEmail } = require('../models');

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

const E4 = {
  status: FORBIDDEN,
  err: 'Invalid entries. Try again.',
};

const E5 = {
  status: FORBIDDEN,
  err: 'Only admins can register new admins',
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

const validAdminMiddleware = async (req, _res, next) => {
  const error = validationResult(req);
  const { role } = req.user;
  if (!error.isEmpty()) return next(E1);
  if (role === 'user') return next(E4);
  next();
};

const AdminMiddleware = async (req, _res, next) => {
  const { authorization } = req.headers;
  const autentic = 'senhaMuitoDificiltrybe';
  const decode = jwt.verify(authorization, autentic);
  const validated = await getEmail(decode.data);
  if (validated.role !== 'admin') return next(E5);
  next();
};

module.exports = {
  validatorMiddleware,
  validLoginMiddleware,
  validAdminMiddleware,
  AdminMiddleware,
};
