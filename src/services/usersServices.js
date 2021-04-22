const {
  getAllUsers,
  postNewUser,
  getUserByEmail,
} = require('../models/usersModels');

const errorInvalidParameters = {
  http: 400,
  message: { message: 'Invalid entries. Try again.' },
};

const testEmailFormat = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return errorInvalidParameters;
  return false;
};

const verifyEmail = async (email) => {
  const allUsers = await getAllUsers();
  const emailExist = allUsers.some((user) => user.email === email);
  if (emailExist) {
    return {
      http: 409,
      message: { message: 'Email already registered' },
    };
  }

  const invalidEmail = testEmailFormat(email);
  if (invalidEmail) return invalidEmail;

  return false;
};

const postResult = async (name, email, password) => {
  await postNewUser(name, email, password);
  const newUser = await getUserByEmail(email);
  return {
    http: 201,
    message: { user: newUser },
  };
};

const validatedParameters = async (name, email, password) => {
  if (!name || !email || !password) return errorInvalidParameters;

  return false;
};

const createNewUser = async (name, email, password) => {
  const paramsIsNotValid = await validatedParameters(name, email, password);
  if (paramsIsNotValid) return paramsIsNotValid;

  const invalidOrExistingEmail = await verifyEmail(email);
  if (invalidOrExistingEmail) return invalidOrExistingEmail;

  return postResult(name, email, password);
};

module.exports = { createNewUser };
