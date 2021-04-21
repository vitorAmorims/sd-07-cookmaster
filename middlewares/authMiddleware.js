const userModel = require('../models/userModel');

const { authTools, errorMessages } = require('../helpers');

const authMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(errorMessages.MISSING_AUTH_TOKEN);

  try {
    const decoded = authTools.verifyToken(token);

    const user = await userModel.getUserByEmail(decoded.data.email);
    console.log(user);
    if (!user) return next(errorMessages.INCORRECT_USERNAME_OR_PASSWORD);
 
    req.user = user;

    next();
  } catch (err) {
    next(errorMessages.JWT_MALFORMED);
  }
};

module.exports = authMiddleware;