const jwt = require('jsonwebtoken');

const secret = 'mysecret';

const validateToken = (token) => {
    try {
         jwt.verify(token, secret);
    } catch (_e) {
        return null;
    }
    return true;
};

module.exports = validateToken;
