const { BAD_REQUEST } = require('../helpers/HttpStatusCodes');

const ERROR_MESSAGE = 'Invalid entries. Try again.';

const nameVerify = (req, res, next) => {
  const { name } = req.body;
  return (name)
    ? next()
    : res.status(BAD_REQUEST).json({
      message: ERROR_MESSAGE,
    });
};

const emailVerify = (req, res, next) => {
  const { email } = req.body;
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email && EMAIL_REGEX.test(email)) return next();
  return res.status(BAD_REQUEST).json({
    message: ERROR_MESSAGE,
  });
};

const passwordVerify = (req, res, next) => {
  const { password } = req.body;
  return (password)
    ? next()
    : res.status(BAD_REQUEST).json({
      message: ERROR_MESSAGE,
    });
};

module.exports = {
  nameVerify,
  emailVerify,
  passwordVerify,
};
