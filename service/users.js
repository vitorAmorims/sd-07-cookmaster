const { createUserModel,
  findUserByEmail,
  // getAllUsers,
} = require('../models/users');

const validateUser = ({ name, email, password }) => {
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const verification = regex.test(email);

  if (!name || !email || !verification || !password) {
    throw new Error('Invalid entries. Try again.');
  }
};

const ifEMailExists = async (email) => {
  const emailExist = await findUserByEmail(email);
  if (emailExist) {
    return true;
  }
  return false;
};

const createUserService = async (user) => {
  validateUser(user);

  const emailverification = await ifEMailExists(user.email);
  if (emailverification) throw new Error('Email already registered');

  const createdUser = await createUserModel(user);
  console.log(createdUser);
  return createdUser;
};

// const getAllUserService = async () => {
//   const usersList = await getAllUsers();
//   return usersList;
// };

module.exports = {
  createUserService,
  // getAllUserService,
};