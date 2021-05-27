const userModel = require('../models/userModel');

const entrieMessage = { message: 'Invalid entries. Try again.' };
const exitMessage = { message: 'Email already registered' };

function verifyEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return regex.test(email);
}

const entriesValidation = (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error(JSON.stringify(entrieMessage));
  }
};

const emailValidation = (email) => {
  const emailTest = verifyEmail(email);
  if (!emailTest) throw new Error(JSON.stringify(entrieMessage));
};

const emailExists = async (email) => {
  const userEmail = await userModel.findEmail(email);
  if (userEmail) throw new Error(JSON.stringify(exitMessage));
};

const userValidation = async (user) => {
  const { name, email, password } = user;

  entriesValidation(name, email, password);
  emailValidation(email);
  await emailExists(email);
};

module.exports = {
  userValidation,
};
