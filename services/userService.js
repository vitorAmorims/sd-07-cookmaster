const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = 'tatranquilotafavoravel';

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

const verifyLoginInput = (email, password) => {
  if (!requiredField(email)
  || !requiredField(password)) {
   return 'All fields must be filled';
  }
  return null;
};

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user.email }, secret, jwtConfig);
  return token;
};

const verifyUserMatch = async (email, password) => {
  const user = await User.getUserByEmail(email);
  if (user) {
    const simpleCheck = password === user.password;
    const isMatch = simpleCheck || bcrypt.compareSync(password, user.password);
    if (isMatch) return generateToken(user);
  } else {
    return 'Incorrect username or password';
  }
};

const loginFieldsCheck = (email, password) => {
  const inputIsValid = verifyLoginInput(email, password);
  const userIsValid = verifyUserMatch(email, password);
  if (inputIsValid) return inputIsValid;
  return userIsValid;
};

module.exports = {
  verifyUserInput,
  loginFieldsCheck,
};
