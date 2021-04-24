const jwt = require('jsonwebtoken');
const { usersModel } = require('../models');
const key = require('./key');

const create = async (user) => {
  const { _id, email, role } = await usersModel.findEmail(user);
  const header = { algorithm: 'HS256', expiresIn: 60 * 60 * 4 };
  const token = jwt.sign({ _id, email, role }, key, header);
  return token;
};

module.exports = { create };
