const {
  UNAUTHORIZED,
} = require('../controllers/statusCode');

const fieldsMessage = {
  message: 'All fields must be filled',
};

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const loginPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    res.status(UNAUTHORIZED).json(fieldsMessage);
  }

  next();
};

const loginEmail = (req, res, next) => {
  const { email } = req.body;

  const ValidEmail = regexEmail.test(email);

  if (!ValidEmail || email === undefined) {
    res.status(UNAUTHORIZED).json(fieldsMessage);
  }

  next();
};

module.exports = {
  loginPassword,
  loginEmail,
};