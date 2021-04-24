const jwt = require('jsonwebtoken');

const decodeJwt = (token) => {
    const secret = 'dontstopdancing';
    const decode = jwt.verify(token, secret);

    return decode;
};

module.exports = decodeJwt;