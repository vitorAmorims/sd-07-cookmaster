const status = require('../status');
const userModel = require('../models/userModel');

const ALL_FIELDS = 'All fields must be filled';
const INCORRECT = 'Incorrect username or password';

const checkUserToLogin = (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(status.UNAUTHORIZED)
    .json({ message: ALL_FIELDS });
  }
  next();
};

const checkUserAndPass = async (request, response, next) => {
  const { email, password } = request.body;
  const findByEmail = await userModel.findByEmail(email);

  if (!findByEmail) {
    return response.status(status.UNAUTHORIZED)
    .json({ message: INCORRECT });
  }

  if (findByEmail.password !== password) {
    return response.status(status.UNAUTHORIZED)
    .json({ message: INCORRECT });
  }
  next();
};

module.exports = {
  checkUserToLogin,
  checkUserAndPass,
};

/*

*/