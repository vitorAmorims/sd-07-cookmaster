const status = require('../httpStatusCodes');
const UsersModel = require('../models/usersModel');

const loginDataValidation = async (req, res, next) => {
  const { email, password } = req.body;

  const isEmailValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

  if (!isEmailValid) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  
  const user = await UsersModel.findUserByEmail(email);

  if (!user || password !== user.password) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = loginDataValidation;