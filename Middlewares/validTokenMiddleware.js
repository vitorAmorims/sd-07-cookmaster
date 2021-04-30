/** @format */

const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../CODE_ERROR');
const { findRecipeId } = require('../models');

const autentic = 'senhaMuitoDificiltrybe';

const validToken = async (req, _res, next) => {
  const E1 = {
    status: UNAUTHORIZED,
    message: 'missing auth token',
  };

  try {
    const { autorization } = req.headers;
    if (!autorization) return next(E1);
    const decod = jwt.verify(autorization, autentic);
    const validated = await findRecipeId(decod.data);
    req.user = validated;
  } catch (error) {
    next(E1);
  }

  next();
};

module.exports = { validToken };
