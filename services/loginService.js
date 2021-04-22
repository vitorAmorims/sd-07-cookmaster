const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt-nodejs');
const User = require('../models/userModel');

const code = require('../utils/code');
const msg = require('../utils/msg');

const secret = 'cookmastersecret';

const login = async (email, password) => {
  if (!email || !password) return { status: code.UNAUTHORIZED, msg: msg.missFields };
  const user = await User.getByEmail(email);
  if (!user || password !== user.password) {
    return { status: code.UNAUTHORIZED, msg: msg.wrongData };
  }

  const jwtConfig = {
    expiresIn: 60 * 60,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user.email }, secret, jwtConfig);
  return { status: code.OK, msg: { token } };
};

module.exports = {
  login,
};
