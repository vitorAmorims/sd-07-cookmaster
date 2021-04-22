const jwt = require('jsonwebtoken');

const JWT_SECRET = 'e2d856e3e9b75caf9be17a32d521630a';

module.exports = {
  sign: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }),
  verify: (token) => jwt.verify(token, JWT_SECRET),
};
