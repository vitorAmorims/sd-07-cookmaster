const userModel = require('../models/usersModel');

const validateNameAndPassword = (name, password) => {
  if (!name || name === undefined || !password || !password === undefined) {
    return { message: 'Invalid entries. Try again.' };
  }
  return {};
};

const validateEmail = async (email) => {
  const emailExists = await userModel.findEmail(email);
  const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (emailExists) {
    return {
      code: 409,
      message: 'Email already registered',
    };
  }

  if (!email || !regEmail.test(email)) {
    return { message: 'Invalid entries. Try again.' };
  }

  return {};
};

const registerUser = async (name, email, password, role) => {
  const emailExists = await validateEmail(email);

  if (emailExists.message) return emailExists;
  const verifyName = validateNameAndPassword(name, password);
  if (verifyName.message) return verifyName;
  const user = await userModel.registerUser(name, email, password, role);
  return user;
};

module.exports = {
  registerUser,
};
