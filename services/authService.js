const jwt = require('jsonwebtoken');
const { key, header } = require('../helpers');
const { usersModel } = require('../models');

const generateToken = async (user) => {
  const { _id, email, role } = await usersModel.findEmail(user);
  const token = jwt.sign({ _id, email, role }, key, header);
  return token;
};

module.exports = {
  generateToken,
};