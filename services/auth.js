const jwt = require('jsonwebtoken');

const INTERNAL_KEY = 'leet';

const config = {
  expiresIn: 60 * 60,
  algorithm: 'HS256',
};

const createToken = ({ _id, email, role }) => {
  const payload = {
    _id,
    email,
    role,
  };

  return jwt.sign(payload, INTERNAL_KEY, config);
};

const authorizeToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) return next({ status: 401, message: 'missing auth token' });

  try {
    const { _id, email, role } = jwt.verify(authorization, INTERNAL_KEY);
    next({ _id, email, role, status: 200 });
  } catch (err) {
    return response.status(401).send({ message: 'jwt malformed' });
  }
};

module.exports = {
  createToken,
  authorizeToken,
};
