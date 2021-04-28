const { createUserModel, findUserByEmail } = require('../models/users');

const validateEmailAndPassword = async (email, password) => {
  // const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  // const verification = regex.test(email);
  const validatePassAndEmail = await findUserByEmail(email);

  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  if (!validatePassAndEmail || validatePassAndEmail.password !== password) {
    throw new Error('Incorrect username or password');
  }
};

const loginService = async (data) => {
  await validateEmailAndPassword(data.email, data.password);

  const loginUser = await createUserModel(data);
  return loginUser;
};

module.exports = {
  loginService,
};