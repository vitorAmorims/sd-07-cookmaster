const JWT = require('jwt-decode');
const { StatusCodes: {
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR } } = require('http-status-codes');

const recipeInfoTest = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (typeof name !== 'string'
    || typeof ingredients !== 'string'
    || typeof preparation !== 'string') {
    return res.status(BAD_REQUEST).send({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const tokenValidation = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const formated = authorization;
    const token = JWT(formated);
    if (!token) {
      return res.status(UNAUTHORIZED).send({
        message: 'jwt malformed',
      });
    }
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).send({
      message: 'jwt malformed',
    });
  }
};

const tokenExists = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(UNAUTHORIZED).send({
        message: 'missing auth token',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).send(error);
  }
};

module.exports = {
  recipeInfoTest,
  tokenValidation,
  tokenExists,
};