const jwt = require('jsonwebtoken');
const { httpStatusCode } = require('../../constants');

const secret = 'E5teEm3uSu73rP@ssU0rd1';

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Invalid entries. Try again.');
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.userId;
  } catch (error) {
    return next({
      message: 'jwt malformed',
      status: httpStatusCode.UNAUTHORIZED,
    });
  }
  next();
};

module.exports = tokenValidator;