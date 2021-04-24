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
  const result = await modelUser.postdata(name, email, password);
  return result;
};

const createUserAdmin = async (name, email, password, role) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  const result = await modelUser.postdataAdmin(name, email, password, role);
  return result;
};

const getAllUsers = async () => {
  const users = await modelUser.getAll();
  const allUsers = {
    users,
  };
  return allUsers;
};

const getUserById = async (id) => {
  const product = await modelUser.getById(id);
  return product;
};

const updateUser = async (objParams) => {
  const updatedUser = {
    _id: objParams.id,
    name: objParams.name,
    email: objParams.email,
    password: objParams.password,
    role: objParams.role,
  };
  await modelUser.editdata(updatedUser);
  return updatedUser;
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
