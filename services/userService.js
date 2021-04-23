const User = require('../models/userModel');

const requiredField = (field) => {
  if (field === undefined || field === null) return null;
  return true;
};

// function from https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => {
  if (/\S+@\S+\.\S+/.test(email)) {
    return true;
  } 
    return false;
};

const validateUser = (name, email, password) => {
  if (!requiredField(name)
  || !requiredField(email)
  || !requiredField(password)
  || !emailIsValid(email)) {
   return 'Invalid entries. Try again.';
  }
  return null;
};

const emailExists = async (email) => {
  const emailCheck = await User.getUserByEmail(email);
  if (emailCheck) {
    return 'Email already registered';
  }
  return null;
};

const verifyUserInput = async (name, email, password) => {
  const existingEmail = await emailExists(email);
  const userIsValidated = validateUser(name, email, password);

  if (userIsValidated) return userIsValidated;
  if (existingEmail) return existingEmail;

  return null;
};

module.exports = {
  verifyUserInput,
};
