const UsersModel = require('../models/usersModel');
const {
  CONFLICT,
} = require('../httpStatusCodes');

const checkDuplicate = async (req, res, next) => {
  const { email } = req.body;

  const users = await UsersModel.findAll(email);

  const duplicated = users.some((user) => user.email === email);

  if (duplicated) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = checkDuplicate;
