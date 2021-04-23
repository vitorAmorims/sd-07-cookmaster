const JWT = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../status');

const SECRET = '123';

const validateToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error('missing auth token');

    const decodedJWT = JWT.verify(authorization, SECRET);
    console.log(decodedJWT);

    if (!decodedJWT) throw new Error('jwt malformed');
    const { _id, role } = decodedJWT;

    req.userId = _id;
    req.userRole = role;
    next();
  } catch (error) {
    next({
      status: UNAUTHORIZED,
      message: error.message,
    });
  }
};

module.exports = {
  validateToken,
};
