const jwt = require('../helpers/jwt');
const userModel = require('../models/userModel');

const validateName = ({ name }, string) => {
  if (!name) {
    throw new Error(string);
  }
};

const validateEmailAndPassword = ({ email, password }, string) => {
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!email || !regex.test(email) || !password) {
    throw new Error(string);
  }
};
/*
const getById = async (id) => {
  const result = await productModel.getById(id);

  if(!result) {
    const ERR_MESSAGE = 'Wrong id format';
    throw new Error(ERR_MESSAGE);
  }

  return result;
}; */

const add = async (object) => {
  let ERR_MESSAGE = 'Invalid entries. Try again.';
  validateName(object, ERR_MESSAGE);
  validateEmailAndPassword(object, ERR_MESSAGE);
  const { email } = object;
  const user = await userModel.getUserByMail(email);
  
  if (user) {
    ERR_MESSAGE = 'Email already registered';
    throw new Error(ERR_MESSAGE);
  }

  return userModel.add(object);
};

const login = async (object) => {
  let ERR_MESSAGE = 'All fields must be filled';
  validateEmailAndPassword(object, ERR_MESSAGE);
  const user = await userModel.getEmailAndPassword(object);
  
  if (!user) {
    ERR_MESSAGE = 'Incorrect username or password';
    throw new Error(ERR_MESSAGE);
  }

  const token = jwt.createToken(user);

  return { token };
};
/*
const update = (id, name, quantity) => {
  validation(name, quantity);

  return productModel.update(id, name, quantity);
};

const deleteProduct = async (id) => {
  const product = await getById(id);

  return productModel.deleteProduct(product);
}; */

module.exports = {
  add,
  login,
};
