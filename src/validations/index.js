const { ObjectID } = require('bson');

const ERROR_MESSAGE_01 = 'Invalid entries. Try again.';
const ERROR_MESSAGE_02 = 'All fields must be filled';
const ERROR_MESSAGE_03 = 'Incorrect username or password';
const mailValidate = (email) => {
  const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/);
  const emailIsValid = regexEmail.test(email);
  if (email === '' || email === undefined) throw new Error(ERROR_MESSAGE_01);
  if (!emailIsValid) throw new Error(ERROR_MESSAGE_01);
};

const mailDuplicateValidate = (emailStored) => {
  if (emailStored) throw new Error('Email already registered');
};

const passValidate = (password) => {
  if (password === '' || password === undefined) {
    throw new Error(ERROR_MESSAGE_01);
  }
  const passString = password.toString();
  if (passString.length < 6) {
    throw new Error(ERROR_MESSAGE_01);
  }
};

const nameValidate = (name) => {
  if (!name) throw new Error(ERROR_MESSAGE_01);
};

const ingredientsValidate = (ingredients) => {
  if (!ingredients) throw new Error(ERROR_MESSAGE_01);
};

const preparetionValidate = (preparetion) => {
  if (!preparetion) throw new Error(ERROR_MESSAGE_01);
};

const loginValidate = (user) => {
  const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/);
  const emailIsValid = regexEmail.test(user.email);
  if (!user.email || !user.password) throw new Error(ERROR_MESSAGE_02);
  if (!emailIsValid) throw new Error(ERROR_MESSAGE_03);
  if (user.password < 6) throw new Error(ERROR_MESSAGE_03);
};

const idValidate = (id) => {
  if (!ObjectID.isValid(id)) throw new Error('recipe not found');
};

module.exports = {
  idValidate,
  mailValidate,
  nameValidate,
  passValidate,
  loginValidate,
  ingredientsValidate,
  preparetionValidate,
  mailDuplicateValidate,
};
