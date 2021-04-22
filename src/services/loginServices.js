const { getUserByEmail } = require('../models/usersModels');
const jwt = require('jsonwebtoken');

const secret = 'projetoMuitoDificilMeuDeus';

const errorInvalidParameters = {
  http: 401,
  message: { message: 'All fields must be filled' },
};

const errorUnauthorized = {
  http: 401,
  message: { message: 'Incorrect username or password' },
};

const validatedParameters = (email, password) => {
  if (!email || !password) return errorInvalidParameters;
  return false;
};

const validatesTheData = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) return errorUnauthorized;
  if (user.password !== password) return errorUnauthorized;
  return false;
};

const login = async (email, password) => {
  const parametersIsNotValid = validatedParameters(email, password);
  if (parametersIsNotValid) return parametersIsNotValid;

  const unauthorized = await validatesTheData(email, password);
  if (unauthorized) return unauthorized;

  const user = await getUserByEmail(email);
  const data = {
    id: user._id,
    user: user.email,
    role: user.role,
  };

  const token = jwt.sign(data, secret);
  return {
    http: 200,
    message: { token },
  };
};

module.exports = { login };
