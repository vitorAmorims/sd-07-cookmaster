const userModel = require('../models/userModel');

const validadeName = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

const validadeEmail = (email) => {
  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  if (!email || !emailRegex.test(email)) {
    return false;
  }
  return true;
};

const emailUnique = async (email) => {
  const searchEmail = await userModel.getUserEmail(email);
  if (searchEmail) {
    return false;
  }
  return true;
};

const validatePassword = (password) => {
  if (!password) {
    return false;
  }
  return true;
};

const registerUser = async (name, email, password) => {
  if (!validadeName(name) || !validadeEmail(email) || !validatePassword(password)) {
    return {
      erro: {
        message: 'Invalid entries. Try again.', status: 400,
      },
    };
  }

  if (!await emailUnique(email)) {
    return {
      erro: { message: 'Email already registered', status: 409 },
    };
  }
  const register = await userModel.registerUser(name, email, password);
  // console.log(register);
  return register;
};

const getAllUsers = async () => userModel.getAllUsers();

module.exports = {
  registerUser,
  getAllUsers,
};
