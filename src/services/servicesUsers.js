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
  // const rules = await rulesInsUsers(name, email, password);
  // if (!rules) {
  //   return false;
  // };
  
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


// const getById = async (id) => {
//   // validacao por id

//   if (!ObjectId.isValid(id)) {
//     // console.log('servicegetById-IF01');
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   const productId = await modelsProducts.getById(id);
//   // console.log('servicegetById');
//   if (!productId) {
//     // console.log('servicegetById-IF02');
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   return productId;
// };

module.exports = {
  createUser,
  getAll,
  // createLogin
  // getById,
  // updateById,
  // excludeById
};