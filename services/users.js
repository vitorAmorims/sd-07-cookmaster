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
  if (!isValid) {
    const error = { code: code[41], message: message.loginIsInvalid };
    throw error;
  }
};

const findUserByEmailService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = { code: code[41], message: message.loginIsInvalid };
    throw error;
  }
  return user;
};

const loginService = async (email, password, role, _id) => {
  // loginIsRequired(email, password);
  await loginIsValid(email, password);
  emailIsInvalid(email);
  return generateToken({ email, role, _id });
};

module.exports = {
  addUserService,
  getAllUsersService,
  findUserByEmailService,
  loginIsRequired,
  loginService,
  nameIsRequired,
  findUserByEmail,
};