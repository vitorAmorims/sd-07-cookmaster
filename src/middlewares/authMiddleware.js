const { StatusCodes } = require('http-status-codes'); 
const { verifyToken } = require('../helpers/authentication');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateToken,
};
