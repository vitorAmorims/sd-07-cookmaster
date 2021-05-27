const userModel = require('../models/userModel');

const entrieMessage = { message: 'All fields must be filled' };
const loginMessage = { message: 'Incorrect username or password' };

function verifyEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return regex.test(email);
}

const entriesValidation = (email, password) => {
  if (!email || !password) {
    throw new Error(JSON.stringify(entrieMessage));
  }
};

const emailValidation = (email) => {
  const emailTest = verifyEmail(email);
  if (!emailTest) throw new Error(JSON.stringify(entrieMessage));
};

const emailExists = async (email) => {
  const userEmail = await userModel.findEmail(email);
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
