const jwt = require('jsonwebtoken');

const secret = 'my secret';

const headers = {
    expiresIn: '7d',
    algorithm: 'HS256',
 };

const jwtCreate = (payload) => {
  const token = jwt.sign(payload, secret, headers);
    return token;
};

 module.exports = jwtCreate;
