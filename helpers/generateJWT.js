const jwt = require('jsonwebtoken');

function generateJWT({ _id, email, role }) {
  const payload = { id: _id, email, role };
  const secret = 'Trybe2021';
  const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
}

module.exports = { generateJWT };
