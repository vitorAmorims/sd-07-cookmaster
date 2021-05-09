const { ServicesToken } = require('../services');
const { status } = require('../helpers');

const authMiddleware = (req, resp, next) => {
  const token = req.headers.authorization;
  if (!token) throw status.invalidToken;
  try {
    const result = ServicesToken.verifyToken(token);
    req.user = result;
    next();
  } catch (error) {
    next(status.invalidToken.code);  
  }
};

module.exports = authMiddleware;
