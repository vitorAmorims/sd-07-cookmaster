const JWT = require('jsonwebtoken');
const status = require('../status');
const userModel = require('../models/userModel');

const secret = 'cookmasterSecret';

const NO_TOKEN = 'missing auth token';
const MALFORMED = 'jwt malformed';
const ENTRIES = 'Invalid entries. Try again.';

const checkToken = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(status.UNAUTHORIZED)
      .json({ message: MALFORMED });
  }
  try {
    const decoded = JWT.verify(token, secret);
    request.user = decoded.data;
  } catch (error) {
    return response.status(status.UNAUTHORIZED)
      .json({ message: MALFORMED });
  }
  next();
};

const checkTokenToUpdade = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(status.UNAUTHORIZED)
      .json({ message: NO_TOKEN });
  }
  try {
    const decoded = JWT.verify(token, secret);
    request.user = decoded.data;
  } catch (error) {
    return response.status(status.UNAUTHORIZED)
      .json({ message: MALFORMED });
  }
}

const checkRecipeBody = (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    return response.status(status.BAD_REQUEST)
      .json({ message: ENTRIES });
  }
  next();
};

module.exports = {
  checkToken,
  checkTokenToUpdade,
  checkRecipeBody,
};