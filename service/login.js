const { createUserModel } = require('../models/users');

const validateEmailAndPassword = (email, password) => {
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const verification = regex.test(email);
  const minPassLength = 6;

  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  if (!verification || password.length <= minPassLength) {
    throw new Error('Incorrect username or password');
  }
};

const loginService = async (data) => {
  validateEmailAndPassword(data.email, data.password);

  const loginUser = await createUserModel(data);
  return loginUser;
};

module.exports = {
  loginService,
};