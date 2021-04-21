// const bcrypt = require('bcrypt-nodejs');
const User = require('../models/userModel');
const code = require('../utils/code');
const msg = require('../utils/msg');

const validateEmail = (email) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return email && regexEmail.test(email);
};

const emailExists = async (email) => {
  const user = await User.getByEmail(email);
  return user;
};

const createUser = async (name, email, password, role) => {  
  if (!name || !password || !validateEmail(email)) {
    return {
      status: code.BAD_REQUEST,
      msg: msg.invEntries,
    };
  }
  if (await emailExists(email)) {
    return {
      status: code.CONFLICT,
      msg: msg.emailExists,
    };
  }
  // const salt = bcrypt.genSaltSync(5);
  // const newPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create(name, email, password, role);
  return { status: code.CREATED, msg: newUser };
};

module.exports = {
  createUser,
};
