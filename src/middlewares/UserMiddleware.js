const httpStatus = require('../../helpers/httpStatus');

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
};
