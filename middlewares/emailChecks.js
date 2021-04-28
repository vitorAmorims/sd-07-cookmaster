// https://www.npmjs.com/package/email-validator
const emailValidator = require('email-validator');

const usersModel = require('../models/usersModel');

const emailMiddleware = async (req, res, next) => {
  const { email } = req.body;

  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const findEmail = await usersModel.getByEmail(email);
  if (findEmail) {
    return res.status(409).json({ message: 'Email already registered' });
}

  next();
};

module.exports = emailMiddleware;
