const jwt = require('jsonwebtoken');

const secret = 'mysecret';

const headers = {
    expiresIn: '7d',
    algorithm: 'HS256',
 };

const jwtCreate = (payload) => {
  const token = jwt.sign(payload, secret, headers);
    return token;
};

 module.exports = jwtCreate;