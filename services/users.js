const {
  addUserModel,
  findUserByEmail,
  getAllUsersModel,
  findEmailAndPassword,
} = require('../models/users');

const { generateToken } = require('../helpers/token');

const { code, message } = require('../helpers/messages');

const emailIsRequired = (email) => {
  if (!email) {
    const error = { code: code[40], message: message.invalidEntries };
    throw error;
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
  console.log('service userExists:', userExists);
  if (userExists) {
    const error = { code: code[49], message: message.emailAlreadyExists };
    throw error;
  }
};

const verifyEmail = async (email) => {
  emailIsRequired(email);
  emailIsInvalid(email);
  await emailAlreadyExists(email);
};

const passwordIsRequired = (password) => {
  if (!password) {
    const error = { code: code[40], message: message.invalidEntries };
    throw error;
  }
};

const verifyPassword = (password) => {
  passwordIsRequired(password);
};

const nameIsRequired = (name) => {
  if (!name) {
    const error = { code: code[40], message: message.invalidEntries };
    throw error;
  }
};

const verifyName = (name) => {
  nameIsRequired(name);
};

const addUserService = async (name, email, password) => {
  verifyName(name);
  verifyPassword(password);
  await verifyEmail(email);

  const newUser = await addUserModel(name, email, password);
  return newUser;
};

const getAllUsersService = async () => {
  const results = await getAllUsersModel();
  return results;
};

const loginIsRequired = (email, password) => {
  if (!email || !password) {
    const error = { code: code[41], message: message.loginIsRequired };
    throw error;
  }
};

const loginIsValid = async (email, password) => {
  const isValid = await findEmailAndPassword(email, password);
  console.log('service loginIsValid:', isValid);
  if (!isValid) {
    const error = { code: code[41], message: message.loginIsInvalid };
    throw error;
  }
};

const loginService = async (email, password) => {
  loginIsRequired(email, password);
  await loginIsValid(email, password);
  return generateToken({ email, password });
};

module.exports = {
  addUserService,
  getAllUsersService,
  loginService,
};