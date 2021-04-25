const { errorMessage, CONFLICT } = require('../config/httpCodes');
const { getAllUsers } = require('../models/UsersModels');

const validateUniqueEmail = async (req, res, next) => {
  let emailYetRegistered = false;
  const { email } = req.body;
  const data = await getAllUsers();

  data.forEach((user) => {
    if (user.email === email) emailYetRegistered = true;
  });

  const error = errorMessage;
  error.message = 'Email already registered';

  if (emailYetRegistered) return res.status(CONFLICT).json(error);
  next();
};

module.exports = validateUniqueEmail;
