const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/usersModels');

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

const login = async (emailParam, passwordParam) => {
  const parametersIsNotValid = validatedParameters(emailParam, passwordParam);
  if (parametersIsNotValid) return parametersIsNotValid;

  const unauthorized = await validatesTheData(emailParam, passwordParam);
  if (unauthorized) return unauthorized;

  const { _id: id, email, role } = await getUserByEmail(emailParam);
  const data = {
    id,
    email,
    role,
  };

  const token = jwt.sign(data, secret);
  return {
    http: 200,
    message: { token },
  };
};

module.exports = { login };
