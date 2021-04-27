const jwt = require('jsonwebtoken');
const { findUser } = require('../models/UsersModels');
const { errorMessage, UNAUTHORIZED } = require('../config/httpCodes');

const secret = 'NelMezzoDelCamminDiNostraVita';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const error = errorMessage;
  error.message = 'missing auth token';

  if (!token) {
    return res.status(UNAUTHORIZED).json(error);
  }
  error.message = 'jwt malformed';
  try {
    const decoded = jwt.verify(token, secret);
    const user = await findUser(decoded.data);

    if (!user) return res.status(UNAUTHORIZED).json(error);
    next();
  } catch (err) {
    console.error(err);
    return res.status(UNAUTHORIZED).json(error);
  }
};

module.exports = validateToken;
