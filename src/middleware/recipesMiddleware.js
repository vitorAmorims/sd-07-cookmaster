const JWT = require('jsonwebtoken');
const status = require('../status');
const userModel = require('../models/userModel');

const secret = 'cookmasterSecret';

const NO_TOKEN = 'jwt malformed';
const ENTRIES = 'Invalid entries. Try again.';

const checkToken = async (request, response, next) => {
  const token = request.headers['authorization'];
  console.log('token:', token)
  if (!token) {
    return response.status(status.UNAUTHORIZED)
    .json({ message: NO_TOKEN });
  }
  try {
    const decoded = JWT.verify(token,secret)
    const user = await userModel.findByEmail(decoded.data.email);
    console.log('decoded', decoded)
  
    if (!user) {
      return response.status(status.UNAUTHORIZED)
        .json({ message: NO_TOKEN });
    }
    request.user = user;
  } catch (error) {
    return response.status(status.UNAUTHORIZED)
    .json({ message: NO_TOKEN });
  }
  next();
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
  checkRecipeBody
};