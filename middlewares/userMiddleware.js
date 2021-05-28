const { code400, code409, message } = require('../utils/dictionary');
const userModel = require('../models/userModel');

// validating fields
const validatingFields = async (request, response, next) => {
  const { name, email, password } = request.body;
  // console.log('validatingFields');

  if (!name || !email || !password) {
    return response.status(code400).json({ message: message.tryAgain });
  }
  next();
};

// valid email
const validatingEmail = async (request, response, next) => {
  const { email } = request.body;
  const emailReg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const isValidEmail = emailReg.test(email);
  // console.log('validatingEmail');
  
  if (!isValidEmail) {
    return response.status(code400).json({ message: message.tryAgain });
  }
  next();
};

// email registered
const checkingEmailExists = async (request, response, next) => {
  const { email } = request.body;
  const emailRegistered = await userModel.userByEmail(email);
  // console.log('checkingEmailExists');
  
  if (emailRegistered) {
    return response.status(code409).json({ message: message.emailRegistered });
  }
  next();
};

const userValidations = [
  validatingFields,
  validatingEmail,
  checkingEmailExists,
];

module.exports = {
  validatingFields,
  validatingEmail,
  checkingEmailExists,
  userValidations,
};
