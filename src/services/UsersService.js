const UsersModel = require('../models/UsersModel');

const INVALID_DATA_ERROR = {
  code: 'bad_request',
  message: 'Invalid entries. Try again.',
};

const CONFLICT_EMAIL_ERROR = {
  code: 'conflict',
  message: 'Email already registered',
};

const validName = (name) => {  
  if (!name || name === '') throw INVALID_DATA_ERROR;
};

const validEmail = async (email) => {  
  if (!email || email === '') throw INVALID_DATA_ERROR;

  const REGEX = /\S+@\S+\.\S+/;
  const testedEmail = REGEX.test(email);
  if (!testedEmail) throw INVALID_DATA_ERROR;

  const existEmail = await UsersModel.findUserByEmail(email);
  if (existEmail) throw CONFLICT_EMAIL_ERROR;
};

const validPassword = (password) => {
  if (!password || password === '') throw INVALID_DATA_ERROR;
};

const create = async (name, email, password, role) => {  
    validName(name);
    await validEmail(email);
    validPassword(password);
    const newUser = await UsersModel.create(name, email, password, role);
    return newUser;
  };

  const readAllUsers = async () => {
    const users = await UsersModel.readAllUsers();
    return users;
  };  
  
module.exports = { create, readAllUsers };