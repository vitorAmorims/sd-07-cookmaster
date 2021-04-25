const { ObjectId } = require('mongodb');
const modelsUsers = require('../models/modelsUsers');

// const OK = 200;
// const CREATED = 201;
// const BADREQUEST = 400;
// const CONFLICT = 409;
// const UNPROCESSABLEENTITY = 422;
// const INTERNALSERVERERROR = 500;

// rules for insert users
const rulesInsUsers = async (name, email, password) => {
  const regexEmail = /\S+@\S+.\S+/;
  const checkEmail = regexEmail.test(email);
  
  const dataEmail = await modelsUsers.getByEmail(email);
  if (dataEmail) {
    throw {
      code: 'conflict',
      message: 'Email already registered',
    };
  }
  
  if (!name || !email || !password || !checkEmail ) {
    throw {
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
  }
  return true;
};

const createUser = async (name, email, password) => {
  const rules = await rulesInsUsers(name, email, password);
  if (!rules) {
    return false;
  };
  
  const userInserted = await modelsUsers.create(name, email, password);
  return userInserted;
};

const getAll = async () => {
  const users = await modelsUsers.getAll();
  const usersList = {
    users,
  };
  return usersList;
};

module.exports = {
  createUser,
  getAll,
  rulesInsUsers,
  // createLogin
  // getById,
  // updateById,
  // excludeById
};