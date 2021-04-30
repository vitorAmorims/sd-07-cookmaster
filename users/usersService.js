const jwt = require('jsonwebtoken');
const usersModel = require('./usersModel');

const secret = 'cookmaster';
const dezMin = 60 * 10;

const jwtConfig = {
  expiresIn: dezMin,
  algorithm: 'HS256',
};

const registerUserService = async (user, role = 'user') => {
  const emailService = await usersModel.findEmailModel(user.email);
  if (emailService) return null;
  const addService = await usersModel.registerUserModel(user, role);
  return { user: addService };
};

const findUserService = async () => {
  const findService = await usersModel.findUserModel();
  return findService;
};

const findEmailService = async (email) => {
  const findUser = await usersModel.findEmailModel(email);
  return findUser;
};

const loginUserService = async (email, password) => {
  const findUser = await findEmailService(email);
  if (findUser && findUser.password === password) {
    const data = { ...findUser };
    delete data.password;
    const token = jwt.sign(data, secret, jwtConfig);
    return token;
  }
};

module.exports = {
  registerUserService,
  findUserService,
  findEmailService,
  loginUserService,
};