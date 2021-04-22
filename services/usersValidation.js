const usersModel = require('../models/usersModel');

const entriesMessage = { message: 'Invalid entries. Try again.' };
const existMessage = { message: 'Email already registered' };

function verifyEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return emailRegex.test(email);
}

const entriesValidation = (name, email, password) => {
  if (!name || !email || !password) {
  throw new Error(JSON.stringify(entriesMessage));
  }
};

const emailValidation = (email) => {
  const emailTest = verifyEmail(email);
  if (!emailTest) throw new Error(JSON.stringify(entriesMessage));
};

const emailExists = async (email) => {
  const userEmail = await usersModel.findEmail(email);
  if (userEmail) throw new Error(JSON.stringify(existMessage));
};

const usersValidation = async (reqUser) => {
  const { name, email, password } = reqUser;
  
  entriesValidation(name, email, password);
  emailValidation(email);
  await emailExists(email);
};

module.exports = {
  usersValidation,
};
