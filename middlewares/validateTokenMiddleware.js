const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../http');
const usersModel = require('../models/usersModel');

const secret = 'trybe';

const validateToken = async (request, response, next) => {
  const token = request.headers.authorization;
  
  if (!token) throw new Error('missing auth token');

  try {
    const decoded = jwt.verify(token, secret);
    const results = await usersModel.findUserByEmailAddress(decoded.data);
    request.user = results;
  } catch (error) {
    return response.status(UNAUTHORIZED).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateToken,
};
