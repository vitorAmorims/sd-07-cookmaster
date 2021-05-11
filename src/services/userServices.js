const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const secret = 'SDkjasK2343Ad34';
const newError = (message) => { throw new Error(message); };

const newToken = (user) => {
  const jwtConfig = {
    expiresIn: '5m',
    algorithm: 'HS256',
  };

  return jwt.sign(user, secret, jwtConfig);
};

const testEmail = (email) => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email)) newError('Invalid entries. Try again.');
  return null;
};

const newUser = async (objct) => {
  if (!objct.name || !objct.email || !objct.password) {
    newError('Invalid entries. Try again.');
  }
  testEmail(objct.email);

  const user = await model.getUserByEmail(objct.email);
  if (user) newError('Email already registered');

  const newRegister = await model.newUser(objct);
  return newRegister;
};

const newAdmin = async (objct, token) => {
  const person = jwt.verify(token, secret);

  if (person.role !== 'admin') newError('Only admins can register new admins');
  
  const newRegister = await model.newUser({ ...objct, role: 'admin' });
  return newRegister;
};

const getUserByEmail = async (objct) => {
  if (!objct.email || !objct.password) newError('All fields must be filled');

  const user = await model.getUserByEmail(objct.email);
  if (!user || objct.password !== user.password) newError('Incorrect username or password');
  const { password, email, ...userNonSensInfos } = user;

  return { token: newToken(userNonSensInfos) };
};

module.exports = {
  newUser,
  newAdmin,
  getUserByEmail,
};