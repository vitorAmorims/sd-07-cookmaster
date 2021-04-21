const modelUser = require('../models/users');

const ERR_MESSAGE = 'Invalid entries. Try again.';

const validateName = (name) => {
  if (!name) {
    throw new Error(ERR_MESSAGE);
  }
};

const validateEmail = (email) => {
  if (!email) {
    throw new Error(ERR_MESSAGE);
  }
  if (email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      throw new Error(ERR_MESSAGE);
    }
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error(ERR_MESSAGE);
  }
};

const checkingEmailExists = async (email) => {
  const exists = await modelUser.getByEmail(email);
  const ERR_MESSAGE = "Email already registered";
  if (exists) {
    throw new Error(ERR_MESSAGE);
  }
};

const createUser = async (name, email, password) => {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    await checkingEmailExists(email);
    const result = await modelUser.postdata(name, email, password);
    return result;
};

const getAllUsers = async () => {
  const products = await modelUser.getAll();
  const allProducts = {
    products,
  };
  return allProducts;
};

const getUserById = async (id) => {
  const product = await modelUser.getById(id);
  return product;
};

const updateUser = async (id, name, quantity) => {
  await modelUser.editdata(id, name, quantity);
  const updatedProduct = {
    _id: id,
    name,
    quantity
  };
  return updatedProduct;
};

const deleteUser = async (id) => {
  return await modelUser.deletedata(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};