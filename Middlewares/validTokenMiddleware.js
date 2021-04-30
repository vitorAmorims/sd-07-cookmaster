/** @format */

const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../CODE_ERROR');
const { getEmail } = require('../models');

const autentic = 'senhaMuitoDificiltrybe';
const E1 = {
  status: UNAUTHORIZED,
  err: 'jwt malformed',
};

const E2 = {
  status: UNAUTHORIZED,
  err: 'missing auth token',
};

const validToken = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(E2);
    const decode = jwt.verify(authorization, autentic);
    if (!decode) return next(E1);
    const validated = await getEmail(decode.data);
    if (!validated) return next(E1);
    req.user = validated;
  } catch (error) {
    return next(E1);
  }

  next();
};

module.exports = { validToken };
