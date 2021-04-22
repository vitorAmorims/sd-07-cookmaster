const { BAD_REQUEST } = require('../controllers/statusCode');

const entriesMessage = {
  message: 'Invalid entries. Try again.',
};

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(BAD_REQUEST).json(entriesMessage);
  }
  next();
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(BAD_REQUEST).json(entriesMessage);
  }

  next();
};

const validationEmail = (req, res, next) => {
  const { email } = req.body;
  const ValidEmail = regexEmail.test(email);
  if (!ValidEmail || email === undefined) {
    return res.status(BAD_REQUEST).json(entriesMessage);
  }
  next();
};

module.exports = {
  validationName,
  validationPassword,
  validationEmail,
};
