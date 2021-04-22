const jwt = require('jsonwebtoken');
const usersModels = require('../../models/usersModels');

const secret = 'trybevocemeprometeu';

const { UNAUTHORIZED } = require('../../controllers/statusCode');

const tokenMessage = {
  message: 'jwt malformed',
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json(tokenMessage);
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModels.existsEmail(decoded.data);
    if (!user) {
      res.status(UNAUTHORIZED).json(tokenMessage);
    }
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json(tokenMessage);
  }
};

module.exports = validateToken;
