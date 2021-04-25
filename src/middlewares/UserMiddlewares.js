const { BAD_REQUEST, UNAUTHORIZED } = require('../helpers/HttpStatusCodes');

const ERROR_MESSAGE_USERS = 'Invalid entries. Try again.';
const ERROR_MESSAGE_LOGIN = 'All fields must be filled';

const nameVerify = (req, res, next) => {
  const { name } = req.body;
  return (name)
    ? next()
    : res.status(BAD_REQUEST).json({
      message: ERROR_MESSAGE_USERS,
    });
};

/* const emailVerify = (req, res, next) => {
  const { email } = req.body;
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email && EMAIL_REGEX.test(email)) return next();
  return res.status(BAD_REQUEST).json({
    message: ERROR_MESSAGE_USERS,
  });
}; */

const emailVerify = (req, res, next) => {
  const { body: { email }, baseUrl } = req;
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email && EMAIL_REGEX.test(email)) return next();
  if (baseUrl === '/users') {
    return res.status(BAD_REQUEST).json({
      message: ERROR_MESSAGE_USERS,
    });
  }
  return res.status(UNAUTHORIZED).json({
    message: ERROR_MESSAGE_LOGIN,
  });
};

const passwordVerify = (req, res, next) => {
  const { body: { password }, baseUrl } = req;
  if (password) return next();
  if (baseUrl === '/users') {
    return res.status(BAD_REQUEST).json({
      message: ERROR_MESSAGE_USERS,
    });
  }
  return res.status(UNAUTHORIZED).json({
    message: ERROR_MESSAGE_LOGIN,
  });
};

/* const passwordVerify = (req, res, next) => {
  const { password } = req.body;
  return (password)
    ? next()
    : res.status(BAD_REQUEST).json({
      message: ERROR_MESSAGE_USERS,
    });
}; */

module.exports = {
  nameVerify,
  emailVerify,
  passwordVerify,
};
