const status = require('../httpStatusCodes');

const userDataValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  const isEmailValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

  if (!name || !email || !password || !isEmailValid) {
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = userDataValidation;
