const { CustomError, STATUS_CODE } = require('../helpers');
const { usersModel } = require('../models');

const checkIfNameEmailAndPasswordExist = (name, email, password) => {
  if (!name || !email || !password) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
};

const checkIfEmailIsValid = (email) => {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!regex) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
};

const checksIfEmailIsUnique = async (email) => {
  const result = await usersModel.findEmail(email);
  if (result) {
    throw new CustomError({
      status: STATUS_CODE.CONFLICT,
      message: 'Email already registered',
    });
  }
};

const userRegistration = async (name, email, password) => {
  const role = 'user';
  checkIfNameEmailAndPasswordExist(name, email, password);
  checkIfEmailIsValid(email);
  await checksIfEmailIsUnique(email);

  const result = await usersModel.userRegistration(name, email, password, role);
  return result;
};

module.exports = {
  userRegistration,
};