const e = require('express');

const { loginService } = require('../../Services/userService');

const EMAIL_REGEX = /^[a-z0-9.]+@[a-z]+\.[a-z]/i;
const MINSIZE = 6;

const validationFilds = (email, password) => {
  if (!email || !password) {
    return { status: 401, message: { message: 'All fields must be filled' } };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { status: 401, message: { message: 'Incorrect username or password' } };
  }
  if (password.length <= MINSIZE) {
    return { status: 401, message: { message: 'Incorrect username or password' } };
  }
};

const validationLogin = (result, userPassword) => {
  const { email, password } = result;
  if (!email || password !== userPassword) {
    return { status: 401, message: { message: 'All fields must be filled' } };
  }
};

const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (validationFilds(email, password)) {
      res
        .status(validationFilds(email, password).status)
        .json(validationFilds(email, password).message);
    }
    const result = await loginService(email, password);
    if (validationLogin(result[0], password)) {
      res
        .status(validationLogin(result[0], password).status)
        .json(validationLogin(result[0], password).message);
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal error:', error: e });
  }
};

module.exports = {
  loginMiddleware,
};
