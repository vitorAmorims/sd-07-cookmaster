const jwt = require('jsonwebtoken');

const secret = 'minhaSenhaUltraSecreta';
const tokenValidation = (req, res, next) => {
    const { token } = req.headers;
    try {
        jwt.verify(token, secret);
    } catch (error) {
        res.status(401).json({ message: 'jwt malformed' });
    }
    next();
};

module.exports = {
    tokenValidation,
};
