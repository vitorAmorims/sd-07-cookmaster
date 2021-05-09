const { ServicesToken } = require('../services');
const { status } = require('../helpers');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw status.invalidToken;
    const result = ServicesToken.verifyToken(token);
    req.user = result;
    next();
  } catch (error) {
    return res.status(status.invalidToken.code).json(status.invalidToken.message); 
  }
};

module.exports = authMiddleware;
