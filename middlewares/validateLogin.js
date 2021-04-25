const { findUser } = require('../models/UsersModels');
const { errorMessage, UNAUTHORIZED } = require('../config/httpCodes');

const validateLogin = async (req, res, next) => {
  const { email } = req.body;
  const error = errorMessage;
  error.message = 'Incorrect username or password';

  const user = await findUser(email);

  if (!user) return res.status(UNAUTHORIZED).json(error);
  next();
};

module.exports = validateLogin;
