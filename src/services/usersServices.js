const {
  getAllUsers,
  postNewUser,
  getUserByEmail,
} = require('../models/usersModels');

const errorInvalidParameters = {
  http: 400,
  message: { message: 'Invalid entries. Try again.' },
};

const verifyEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatedParameters = async (name, email, password) => {
  if (!name || !email || !password) return errorInvalidParameters;

  const emailIsValid = verifyEmail(email);
  if (!emailIsValid) return errorInvalidParameters;

  const allUsers = await getAllUsers();
  const emailExist = allUsers.some((user) => user.email === email);
  if (emailExist) {
    return {
      http: 409,
      message: { message: 'Email already registered' },
    };
  }

  await postNewUser(name, email, password);
  const newUser = await getUserByEmail(email);
  return {
    http: 201,
    message: { user: newUser },
  };
};

const createNewUser = async (name, email, password) => {
  return validatedParameters(name, email, password);
};

module.exports = { createNewUser };
