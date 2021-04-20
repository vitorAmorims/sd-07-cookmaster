const userModel = require('../models/userModel');

const validation = ({ name, email, password }) => {
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const ERR_MESSAGE = 'Invalid entries. Try again.';
  if (!name || !email || !password || !regex.test(email)) {
    throw new Error(ERR_MESSAGE);
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
  validation(object);
  const { email } = object;
  const user = await userModel.getUserByMail(email);
  
  if (user) {
    const ERR_MESSAGE = 'Email already registered';
    throw new Error(ERR_MESSAGE);
  }

  return userModel.add(object);
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
};
