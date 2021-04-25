const modelUser = require('../Model/UserModel');

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
  const MESSAGE = 'Email already registered';
  if (exists) {
    throw new Error(MESSAGE);
  }
};

const createUser = async (name, email, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  const result = await modelUser.createUser(name, email, password);
  return result;
};

const createUserAdmin = async (name, email, password, role) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  const result = await modelUser.createUserAdmin(name, email, password, role);
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
  const product = await modelUser.getUserById(id);
  return product;
};

const updateUser = async (id, name, quantity) => {
  await modelUser.editdata(id, name, quantity);
  const updatedProduct = {
    _id: id,
    name,
    quantity,
  };
  return updatedProduct;
};

const deleteUser = async (id) => {
  await modelUser.deletedata(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUserAdmin,
};