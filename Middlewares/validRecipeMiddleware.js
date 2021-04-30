/** @format */

const { validationResult } = require('express-validator');
const { BAD_REQ } = require('../CODE_ERROR');

const E1 = {
  status: BAD_REQ,
  err: 'Invalid entries. Try again.',
};

const validRecipeMiddleware = async (req, _res, next) => {
  const error = validationResult(req);
  const { role } = req.user;
  if (!error.isEmpty()) return next(E1);
  if (role === 'user') return next(E1);
  next();
};

module.exports = { validRecipeMiddleware };
