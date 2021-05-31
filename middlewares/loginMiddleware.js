const { code401, message } = require('../utils/dictionary');
const userModel = require('../models/userModel');

// validating fields
const validatingFields = async (request, response, next) => {
  const { email, password } = request.body;
  // console.log('validatingFields');

  if (!email || !password) {
    return response.status(code401).json({ message: message.mustBeFilled });
  }
  next();
};

// valid email
const validatingEmail = async (request, response, next) => {
  const { email } = request.body;
  const user = await userModel.userByEmail(email);
  // console.log('checkingEmailExists');
  
  if (!user) {
    return response.status(code401).json({ message: message.incorrectInfo });
  }
  next();
};

// valid password
const checkingValidPassword = async (request, response, next) => {
  const { email, password } = request.body;
  const user = await userModel.userByEmail(email);
  // console.log('password', password);
  // console.log('user', user.password);

  if (password !== user.password) {
    return response.status(code401).json({ message: message.incorrectInfo });
  }
  next();
};

const loginValidations = [
  validatingFields,
  validatingEmail,
  checkingValidPassword,
];

module.exports = {
  validatingFields,
  validatingEmail,
  checkingValidPassword,
  loginValidations,
};
