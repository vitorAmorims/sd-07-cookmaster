const usersModel = require('../models/usersModel');
const { Unauthorized } = require('../config/statusCode');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(Unauthorized).json({ message: 'All fields must be filled' });
  }

  const userLogin = await usersModel.getUserEmail(email);
  if (!userLogin || userLogin.password !== password) {
    return res.status(Unauthorized).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = validateLogin;
