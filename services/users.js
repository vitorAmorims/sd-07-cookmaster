const {
  addUserModel,
  findUserByEmail,
  getAllUsersModel,
} = require('../models/users');

const { code, message } = require('../helpers/messages');

const emailIsRequired = (email) => {
  if (!email) {
    const error = { code: code[40], message: message.invalidEntries };
    return error;
  }
};

const emailIsInvalid = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (typeof email !== 'string' || !regex.test(email)) {
    const error = { code: code[40], message: message.invalidEntries };
    throw error;
  }
};

const emailAlreadyExists = async (email) => {
  const userExists = await findUserByEmail(email);
  if (userExists) {
    const error = { code: code[21], message: message.emailAlreadyExists };
    throw error;
  }
};

const verifyEmail = async (email) => {
  emailIsRequired(email);
  emailIsInvalid(email);
  await emailAlreadyExists(email);
};

const passwordIsRequired = async (password) => {
  if (!password) {
    const error = { code: code[40], message: message.invalidEntries };
    return error;
  }
};

const verifyPassword = (password) => {
  passwordIsRequired(password);
};

const nameIsRequired = (name) => {
  if (!name) {
    const error = { code: code[40], message: message.invalidEntries };
    return error;
  }
};

const verifyName = (name) => {
  nameIsRequired(name);
};

const addUserService = async (name, email, password) => {
  verifyName(name);
  verifyPassword(password);
  verifyEmail(email);

  const newUser = await addUserModel(name, email, password);
  return newUser;
};

const getAllUsersService = async () => {
  const results = await getAllUsersModel();
  return results;
};

module.exports = {
  addUserService,
  getAllUsersService,
};