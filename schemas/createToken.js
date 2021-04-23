const jtw = require('jsonwebtoken');

const secret = '1a2b3c4d5e6f6g7h8i9j';
const headers = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => jtw.sign(payload, secret, headers); 

module.exports = createToken;
