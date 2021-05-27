const JWT = require('jwt-decode');
const { StatusCodes: { BAD_REQUEST, UNAUTHORIZED } } = require('http-status-codes');

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

module.exports = {
  recipeInfoTest,
  tokenValidation,
};