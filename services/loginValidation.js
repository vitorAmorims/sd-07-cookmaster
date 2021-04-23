const usersModel = require('../models/usersModel');

const entriesMessage = { message: 'All fields must be filled' };
const loginMessage = { message: 'Incorrect username or password' };

function verifyEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return emailRegex.test(email);
}

const entriesValidation = (email, password) => {
  if (!email || !password) {
  throw new Error(JSON.stringify(entriesMessage));
  }
};

const emailValidation = (email) => {
  const emailTest = verifyEmail(email);
  if (!emailTest) throw new Error(JSON.stringify(loginMessage));
};

const emailExists = async (email) => {
  const userEmail = await usersModel.findEmail(email);
  if (!userEmail) throw new Error(JSON.stringify(loginMessage));
};

const loginValidation = async (reqLogin) => {
  const { email, password } = reqLogin;
  
  entriesValidation(email, password);
  emailValidation(email);
  await emailExists(email);
};

const passwordValidation = (reqPassord, loginPassaword) => {
  if (reqPassord !== loginPassaword) {
  throw new Error(JSON.stringify(loginMessage));
  }
};

module.exports = {
  loginValidation,
  passwordValidation,
};
