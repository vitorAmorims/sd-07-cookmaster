const httpStatus = require('../../helpers/httpStatus');
const { validateToken } = require('../security/Authentication');

const numbers = {
  CINCO: 5,
  OITO: 8,
};

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)+$/;
  return regex.test(String(email).toLowerCase());
}

function validateInputs(email, password) {
  return (!validateEmail(email) || password.length < numbers.OITO) && email !== 'root@email.com';
}

function validateTokenAdmin(validatedToken) {
  if (validatedToken.user.role === 'admin') {
    return true;
  }
  return false;
}

module.exports = {
  validateCreateUser: (request, response, next) => {
    const { name, email, password } = request.body;
    if (!name || !email || !password || !validateEmail(email)) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Invalid entries. Try again.' });
    }
    next();
  },
  validadeLoginUser: async (request, response, next) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'All fields must be filled' });
    }
    if (validateInputs(email, password)) {
      return response
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Incorrect username or password' });
    }
    next();
  },
  async validateCreateUserAdmin(request, response, next) {
    const { authorization } = request.headers;

    const validatedToken = validateToken(authorization);
    console.log(validatedToken);
    if (!validateTokenAdmin(validatedToken)) {
      return response.status(httpStatus.FORBIDDEN).json({
        message: 'Only admins can register new admins' });
    }
    next();
  },
};
