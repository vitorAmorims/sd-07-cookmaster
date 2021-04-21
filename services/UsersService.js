const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const secret = require('../utils/env');

const add = async (name, email, password) => {
  const sameUser = await Users.getByEmail(email);
  const role = 'user';

  if (!sameUser) {
    const user = Users.add(name, email, password, role);

    return user;
  } 

  return { message: 'Email already registered' };
};

const login = async (emailToLogin, password) => {
  const validUser = await Users.findUser(emailToLogin, password);

  if (validUser) {
    const { _id, email, role } = validUser;

    const jwtConfig = {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
    };

    const token = jwt.sign({ id: _id, email, role }, secret, jwtConfig);

    return token;
  }

  return { message: 'Incorrect username or password' };
};

module.exports = {
  add,
  login,
};